import { useState, useRef, useCallback, useEffect } from 'react';
import {
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  ContentBlock,
  genKey,
  Modifier,
  SelectionState,
} from 'draft-js';
import { Editor as DraftEditor } from 'draft-js';
import 'draft-js/dist/Draft.css';
import styles from './styles.module.scss';
import ToolBar from '@/components/wikiEditor/components/toolBar';
import {
  blockStyleFn as contenidoBlockStyleFn,
  initialStyleMap,
} from 'contenido';
import { colorPalette } from '@/components/wikiEditor/components/colorPalette';
import Media from '@/components/wikiEditor/components/media';
import AddImage from '@/components/modal/components/addImage';
import Modal from '../modal';
import { ProfileDetail } from '@/types/wiki';

interface WikiEditorProps {
  profile: ProfileDetail;
}

const WikiEditor = ({ profile }: WikiEditorProps) => {
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const [title, setTitle] = useState('');
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
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
    const contentState = editorState?.getCurrentContent(); // 여기
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

  const customBlockStyleFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    if (type.startsWith('header-')) {
      return styles[type];
    }
    return contenidoBlockStyleFn(contentBlock);
  };

  const handleReturn = (e: React.KeyboardEvent, editorState: EditorState) => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());

    if (currentBlock.getType().startsWith('header-')) {
      if (currentBlock.getLength() > 0) {
        const newBlockKey = genKey();

        const newBlockSelection = new SelectionState({
          anchorKey: newBlockKey,
          anchorOffset: 0,
          focusKey: newBlockKey,
          focusOffset: 0,
        });

        let newContentState = Modifier.splitBlock(currentContent, selection);
        newContentState = Modifier.setBlockType(
          newContentState,
          newContentState.getSelectionAfter(),
          'unstyled',
        );

        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          'insert-fragment',
        );

        handleEditorChange(
          EditorState.forceSelection(
            newEditorState,
            newContentState.getSelectionAfter(),
          ),
        );
        return 'handled';
      }
    }

    return 'not-handled';
  };

  if (!editorState) {
    return <div>Loading editor...</div>;
  }

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
            handleKeyCommand={handleKeyCommand}
            onChange={handleEditorChange}
            placeholder="자유롭게 위키를 작성해주세요😃"
            blockRendererFn={blockRendererFn}
            blockStyleFn={customBlockStyleFn}
            customStyleMap={styleMap}
            handleReturn={handleReturn}
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
