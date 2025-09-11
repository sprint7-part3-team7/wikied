import { useState, useRef, useCallback, useEffect } from 'react';
import {
  EditorState,
  RichUtils,
  convertToRaw,
  AtomicBlockUtils,
  ContentBlock,
  ContentState,
  SelectionState,
  Modifier,
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
import {
  imageUpload,
  postArticle,
  updateArticle,
} from '@/services/api/article';
import { Article } from '@/types/article';
import { AxiosError } from 'axios';
import { Options, RenderConfig, stateToHTML } from 'draft-js-export-html';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

const Editor = ({ article }: { article?: Article }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [title, setTitle] = useState(article ? article.title : '');

  useEffect(() => {
    if (article) {
      const blocksFromHtml = htmlToDraft(article.content);
      if (blocksFromHtml) {
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap,
        );

        let newEditorState = EditorState.createWithContent(contentState);

        if (article.image) {
          const contentStateWithEntity = newEditorState
            .getCurrentContent()
            .createEntity('IMAGE', 'IMMUTABLE', { src: article.image });
          const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

          newEditorState = AtomicBlockUtils.insertAtomicBlock(
            EditorState.createWithContent(contentStateWithEntity),
            entityKey,
            ' ',
          );
        }
        setEditorState(newEditorState);
        setTitle(article.title);
      }
    }
  }, [article]);

  const [imageUrl, setImageUrl] = useState(article ? article.image : '');
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

        let finalEditorState = editorState;
        let finalContentState = finalEditorState.getCurrentContent();

        finalContentState.getBlocksAsArray().forEach((block) => {
          if (block.getType() === 'atomic') {
            const entityKey = block.getEntityAt(0);
            if (entityKey) {
              const entity = finalContentState.getEntity(entityKey);
              if (entity.getType() === 'IMAGE') {
                const selection = new SelectionState({
                  anchorKey: block.getKey(),
                  anchorOffset: 0,
                  focusKey: block.getKey(),
                  focusOffset: block.getLength(),
                });
                finalContentState = Modifier.removeRange(
                  finalContentState,
                  selection,
                  'forward',
                );
              }
            }
          }
        });

        finalEditorState = EditorState.push(
          finalEditorState,
          finalContentState,
          'remove-range',
        );

        const contentStateWithEntity = finalEditorState
          .getCurrentContent()
          .createEntity('IMAGE', 'IMMUTABLE', { src: uploadedImageUrl });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

        finalEditorState = AtomicBlockUtils.insertAtomicBlock(
          EditorState.set(finalEditorState, {
            currentContent: contentStateWithEntity,
          }),
          entityKey,
          ' ',
        );

        setEditorState(finalEditorState);
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
      const htmlContent = draftToHtml(convertToRaw(contentState));

      const articleData = {
        title: title.trim(),
        content: htmlContent,
        image: imageUrl || article?.image || null,
      };

      try {
        if (article) {
          const response = await updateArticle(article.id, articleData);
          alert('게시물이 수정되었습니다.');
          router.push(`/boards/${response.data.id}`);
        } else {
          const response = await postArticle(articleData);
          alert('게시물이 등록되었습니다.');
          router.push(`/boards/${response.data.id}`);
        }
      } catch (error) {
        console.error('Error details:', error);
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
