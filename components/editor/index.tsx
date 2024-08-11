import { useState, useRef, useCallback, useEffect } from 'react';
import {
  EditorState,
  RichUtils,
  convertToRaw,
  AtomicBlockUtils,
  ContentBlock,
} from 'draft-js';
import { Editor as DraftEditor } from 'draft-js';
import 'draft-js/dist/Draft.css';
import styles from './styles.module.scss';
import ToolBar from '@/components/editor/components/toolBar';
import { blockStyleFn, initialStyleMap } from 'contenido';
import { colorPalette } from '@/components/editor/components/colorPalette';
import Media from '@/components/editor/components/media';
import AddImage from '@/components/modal/components/addImage';
import Modal from '../modal';
import { useRouter } from 'next/router';
import { postArticle } from '@/services/api/article';
import { AxiosError } from 'axios';

const Editor = () => {
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const router = useRouter();
  const editorRef = useRef<DraftEditor | null>(null);

  useEffect(() => {
    setEditorState(EditorState.createEmpty());
  }, []);

  const styleMap = {
    ...initialStyleMap,
    ...Object.fromEntries(
      colorPalette.map((color) => [color.name, { color: color.color }]),
    ),
  };

  const checkSubmitEnabled = useCallback(() => {
    const contentState = editorState?.getCurrentContent();
    const hasText = contentState ? contentState.hasText() : false;
    const isTitleValid = title.trim().length > 0;
    setIsSubmitEnabled(isTitleValid && hasText);
  }, [editorState, title]);

  useEffect(() => {
    checkSubmitEnabled();
  }, [checkSubmitEnabled]);

  const handleEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    checkSubmitEnabled();
  };

  const focusEditor = () => {
    editorRef.current?.focus();
  };

  const handleKeyCommand = useCallback(
    (command: string, editorState: EditorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        handleEditorChange(newState);
        return 'handled';
      }
      return 'not-handled';
    },
    [],
  );

  const handleImageUpload = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        setImageUrl(src);
        const contentState = editorState!.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
          'IMAGE',
          'IMMUTABLE',
          { src },
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState!, {
          currentContent: contentStateWithEntity,
        });
        handleEditorChange(
          AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '),
        );
      };
      reader.readAsDataURL(file);
      setIsImageModalOpen(false);
    },
    [editorState],
  );

  const blockRendererFn = (contentBlock: ContentBlock) => {
    if (contentBlock.getType() === 'atomic') {
      return {
        component: Media,
        editable: false,
      };
    }
    return null;
  };

  const handleSubmit = async () => {
    if (editorState && isSubmitEnabled) {
      const contentState = editorState.getCurrentContent();
      const rawContent = convertToRaw(contentState);

      const articleData = {
        title: title.trim(),
        content: editorState.getCurrentContent().getPlainText(),
        image: imageUrl || 'http://example.com',
      };

      console.log('Sending data:', articleData);

      try {
        const response = await postArticle(articleData);
        console.log('Response:', response);
        // ... 성공 처리
      } catch (error) {
        console.error('Error details:', error);
        const axiosError = error as AxiosError;
        console.error('Error details:', axiosError.response?.data);
        console.error('Error status:', axiosError.response?.status);
        console.error('Error headers:', axiosError.response?.headers);
      }
    }
  };

  const characterCount = editorState
    ? editorState.getCurrentContent().getPlainText('').length
    : 0;

  if (!editorState) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className={styles['editor-wrapper']}>
      <div className={styles['editor-header']}>
        <div className={styles['heading']}>게시물 등록하기</div>
        <button
          className={`${styles['submit-button']} ${
            isSubmitEnabled ? '' : styles['disabled']
          }`}
          onClick={handleSubmit}
          disabled={!isSubmitEnabled}
        >
          등록하기
        </button>
      </div>
      <div className={styles['date-wrapper']}>
        <span className={styles['date-post']}>등록일</span>
        <span>{new Date().toISOString().split('T')[0].replace(/-/g, '.')}</span>
      </div>
      <div className={styles['title-wrapper']}>
        <input
          className={styles['title-input']}
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            checkSubmitEnabled();
          }}
          maxLength={30}
        />
        <span className={styles['title-count']}>
          <span className={styles['current-count']}>{title.length}/</span>
          <span
            className={`${styles['max-count']} ${title.length > 29 ? styles['over-max'] : ''}`}
          >
            30
          </span>
        </span>
      </div>
      <div className={styles['content-count']}>
        <span className={styles['content-count-text']}>
          공백포함 : 총 {characterCount}자 | 공백제외 : 총{' '}
          {characterCount -
            editorState.getCurrentContent().getPlainText().split(' ').length +
            1}
          자
        </span>
      </div>
      <div className={styles['editor-outer-container']}>
        <div className={styles['editor-container']} onClick={focusEditor}>
          <DraftEditor
            ref={editorRef}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={handleEditorChange}
            placeholder="본문을 입력해주세요"
            blockRendererFn={blockRendererFn}
            blockStyleFn={blockStyleFn}
            customStyleMap={styleMap}
          />
        </div>
        <ToolBar
          editorState={editorState}
          onEditorChange={handleEditorChange}
          onImageUpload={() => setIsImageModalOpen(true)}
        />
      </div>
      {isImageModalOpen && (
        <Modal
          size="large"
          onClose={() => setIsImageModalOpen(false)}
          contents={({ size }) => (
            <AddImage size={size} onImageUpload={handleImageUpload} />
          )}
        />
      )}
    </div>
  );
};

export default Editor;
