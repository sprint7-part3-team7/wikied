import { useState, useRef, useCallback, useEffect } from 'react';
import {
  EditorState,
  convertToRaw,
  AtomicBlockUtils,
  RichUtils,
  ContentBlock,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import { Editor as DraftEditor } from 'draft-js';
import 'draft-js/dist/Draft.css';
import styles from './styles.module.scss';
import ToolBar from '@/components/common/wikiEditor/components/toolBar';
import Button from '@/components/common/button';
import { stateFromHTML } from 'draft-js-import-html';
import 'draft-js/dist/Draft.css';
import { Options, stateToHTML } from 'draft-js-export-html';
import Modal from '@/components/common/modal';
import AddImage from '@/components/common/modal/components/addImage';
import Media from '@/components/common/wikiEditor/components/media';
import { ProfileDetail } from '@/types/wiki';
import { blockStyleFn, initialStyleMap } from 'contenido';
import { colorPalette } from '@/components/common/wikiEditor/components/colorPalette';
import { imageFileToUrl } from '@/services/api/profile';

interface WikiEditorProps {
  profile: ProfileDetail;
  onCancel: () => void;
  onSubmit: (content: string, htmlContent: string) => void;
  initialContent?: string;
}

const WikiEditor = ({
  profile,
  onCancel,
  onSubmit,
  initialContent,
}: WikiEditorProps) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  useEffect(() => {
    if (initialContent) {
      try {
        const contentState = stateFromHTML(initialContent);
        setEditorState(EditorState.createWithContent(contentState));
      } catch (error) {
        console.error('Error parsing initial content:', error);
        setEditorState(EditorState.createEmpty());
      }
    }
  }, [initialContent]);

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const editorRef = useRef<DraftEditor>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (initialContent) {
        const blocksFromHTML = convertFromHTML(initialContent);
        const contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap,
        );
        setEditorState(EditorState.createWithContent(contentState));
      } else {
        setEditorState(EditorState.createEmpty());
      }
    }
  }, [initialContent]);

  const styleMap = {
    ...initialStyleMap,
    ...Object.fromEntries(
      colorPalette.map((color) => [color.name, { color: color.color }]),
    ),
  };

  const inlineStyles = Object.entries(styleMap).reduce<
    Record<string, { style: React.CSSProperties }>
  >((acc, [key, value]) => {
    acc[key] = { style: value as React.CSSProperties };
    return acc;
  }, {});

  const handleEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    const contentState = newEditorState.getCurrentContent();
    setIsSubmitEnabled(contentState.hasText());
  };

  const handleSubmit = async () => {
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
          const block = rawContentState.blocks.find(
            (b) => b.text.trim() === liContent.trim(),
          );
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

    onSubmit(styledHtmlContent, styledHtmlContent);
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
      try {
        const response = await imageFileToUrl(file);
        const src = response.data.url;
        setImageUrl(src);
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
          'IMAGE',
          'IMMUTABLE',
          { src },
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {
          currentContent: contentStateWithEntity,
        });
        handleEditorChange(
          AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '),
        );
      } catch (error) {
        console.error('Failed to upload image:', error);
        alert('이미지 업로드에 실패했습니다.');
      }
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

  return (
    <div className={styles['editor-wrapper']}>
      <div className={styles['editor-outer-container']}>
        <ToolBar
          editorState={editorState}
          onEditorChange={handleEditorChange}
          onImageUpload={() => setIsImageModalOpen(true)}
          profile={profile}
        />
        <div className={styles['editor-container']} onClick={focusEditor}>
          <DraftEditor
            ref={editorRef}
            editorState={editorState}
            onChange={handleEditorChange}
            handleKeyCommand={handleKeyCommand}
            placeholder="자유롭게 위키를 작성해주세요😃"
            blockRendererFn={blockRendererFn}
            blockStyleFn={blockStyleFn}
            customStyleMap={styleMap}
          />
        </div>
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
export default WikiEditor;
