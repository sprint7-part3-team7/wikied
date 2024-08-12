import { useState, useRef, useCallback, useEffect } from 'react';
import {
  EditorState,
  RichUtils,
  convertToRaw,
  AtomicBlockUtils,
  ContentBlock,
  RawDraftContentBlock,
} from 'draft-js';
import { Editor as DraftEditor } from 'draft-js';
import 'draft-js/dist/Draft.css';
import styles from './styles.module.scss';
import ToolBar from '@/components/common/editor/components/toolBar';
import { blockStyleFn, initialStyleMap } from 'contenido';
import { colorPalette } from '@/components/common/editor/components/colorPalette';
import Media from '@/components/common/editor/components/media';
import AddImage from '@/components/common/modal/components/addImage';
import Modal from '../modal';
import { useRouter } from 'next/router';
import { imageUpload, postArticle } from '@/services/api/article';
import { AxiosError } from 'axios';
import { Options, RenderConfig, stateToHTML } from 'draft-js-export-html';

const Editor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const router = useRouter();
  const editorRef = useRef<DraftEditor | null>(null);

  const styleMap = {
    ...initialStyleMap,
    ...Object.fromEntries(
      colorPalette.map((color) => [color.name, { color: color.color }]),
    ),
  };

  const inlineStyles = Object.entries(styleMap).reduce<
    Record<string, RenderConfig>
  >((acc, [key, value]) => {
    acc[key] = { style: value as React.CSSProperties };
    return acc;
  }, {});

  const checkSubmitEnabled = useCallback(() => {
    const contentState = editorState.getCurrentContent();
    const hasText = contentState.hasText();
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
    async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await imageUpload(formData);
        const uploadedImageUrl = response.data.url;
        setImageUrl(response.data.url);
        console.log('Image uploaded:', response.data.url);

        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
          'IMAGE',
          'IMMUTABLE',
          { src: uploadedImageUrl },
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {
          currentContent: contentStateWithEntity,
        });
        const newState = AtomicBlockUtils.insertAtomicBlock(
          newEditorState,
          entityKey,
          ' ',
        );
        handleEditorChange(newState);
        setIsImageModalOpen(false);
      } catch (error) {
        console.error('Image upload failed:', error);
      }
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
    if (isSubmitEnabled) {
      const contentState = editorState.getCurrentContent();
      const rawContentState = convertToRaw(contentState);

      const options: Options = {
        inlineStyles: inlineStyles,
        blockStyleFn: (block) => {
          const alignment = block.getData().get('text-align');
          if (alignment) {
            return {
              style: `text-align: ${alignment};`,
            };
          }
          return {};
        },
        entityStyleFn: (entity: any) => {
          const entityType = entity.get('type').toLowerCase();
          if (entityType === 'image') {
            const data = entity.getData();
            return {
              element: 'img',
              attributes: {
                src: data.src,
                alt: data.alt || '',
              },
              style: {
                maxWidth: '100%',
                height: 'auto',
              },
            };
          }
        },
      };

      let htmlContent = stateToHTML(contentState, options);

      htmlContent = htmlContent.replace(/<(ol|ul)>[\s\S]*?<\/\1>/g, (match) => {
        return match.replace(
          /<li([^>]*)>([\s\S]*?)<\/li>/g,
          (liMatch, liAttributes, liContent) => {
            const block = (
              rawContentState.blocks as RawDraftContentBlock[]
            ).find((b) => b.text.trim() === liContent.trim());
            const alignment = block?.data?.['text-align'];
            return alignment
              ? `<li${liAttributes} style="text-align: ${alignment};">${liContent}</li>`
              : liMatch;
          },
        );
      });

      const styledHtmlContent = htmlContent
        .replace(
          /<ul>/g,
          '<ul style="list-style-type: disc; padding-left: 20px;">',
        )
        .replace(
          /<ol>/g,
          '<ol style="list-style-type: decimal; padding-left: 20px;">',
        );

      const articleData = {
        title: title.trim(),
        content: styledHtmlContent,
        image:
          imageUrl ||
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVoYGmUnYaMQR-BxOTuHivxnVnTK8ZPjzACw&s',
      };

      try {
        const response = await postArticle(articleData);
        console.log('Response:', response);
        alert('게시물이 등록되었습니다.');
        router.push(`/boards/${response.data.id}`);
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
    .getCurrentContent()
    .getPlainText('').length;

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
