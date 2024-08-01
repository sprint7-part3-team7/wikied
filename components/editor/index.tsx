import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  EditorState,
  RichUtils,
  convertToRaw,
  AtomicBlockUtils,
  ContentState,
  ContentBlock,
} from "draft-js";
import { Editor as DraftEditor } from "draft-js";
import "draft-js/dist/Draft.css";
import styles from "./styles.module.scss";
import ToolBar from "@/components/editor/components/toolBar";

interface MediaComponentProps {
  contentState: ContentState;
  block: ContentBlock;
}

const MediaComponent = (props: MediaComponentProps) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  return (
    <Image
      src={src}
      alt='Uploaded content'
      width={500}
      height={300}
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
};

const Editor: React.FC = () => {
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const [title, setTitle] = useState("");
  const editorRef = useRef<DraftEditor | null>(null);

  useEffect(() => {
    setEditorState(EditorState.createEmpty());
  }, []);

  const focusEditor = () => {
    editorRef.current?.focus();
  };

  const handleEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  const handleKeyCommand = useCallback(
    (command: string, editorState: EditorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        handleEditorChange(newState);
        return "handled";
      }
      return "not-handled";
    },
    [],
  );

  const handleImageUpload = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const src = e.target?.result as string;
          const contentState = editorState!.getCurrentContent();
          const contentStateWithEntity = contentState.createEntity(
            "IMAGE",
            "IMMUTABLE",
            { src },
          );
          const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
          const newEditorState = EditorState.set(editorState!, {
            currentContent: contentStateWithEntity,
          });
          handleEditorChange(
            AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " "),
          );
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }, [editorState]);

  const blockRendererFn = (contentBlock: ContentBlock) => {
    if (contentBlock.getType() === "atomic") {
      return {
        component: MediaComponent,
        editable: false,
      };
    }
    return null;
  };

  const handleSubmit = () => {
    if (editorState) {
      const contentState = editorState.getCurrentContent();
      const rawContent = convertToRaw(contentState);
      console.log("Title:", title);
      console.log("Content:", JSON.stringify(rawContent));
    }
  };

  const characterCount = editorState
    ? editorState.getCurrentContent().getPlainText("").length
    : 0;

  if (!editorState) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className={styles.editorWrapper}>
      <div className={styles.editorHeader}>
        <div className={styles.heading}>게시물 등록하기</div>
        <button className={styles.submitButton} onClick={handleSubmit}>
          등록하기
        </button>
      </div>
      <div className={styles.dateWrapper}>
        <span className={styles["date-post"]}>등록일</span>
        <span>{new Date().toISOString().split("T")[0].replace(/-/g, ".")}</span>
      </div>
      <div className={styles.titleWrapper}>
        <input
          className={styles.titleInput}
          type='text'
          placeholder='제목을 입력해주세요'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={30}
        />
        <span className={styles.titleCount}>
          <span className={styles.currentCount}>{title.length}/</span>
          <span className={styles.maxCount}>30</span>
        </span>
      </div>
      <div className={styles["content-count"]}>
        <span className={styles["content-count-text"]}>
          공백포함 : 총 {characterCount}자 | 공백제외 : 총{" "}
          {characterCount -
            editorState.getCurrentContent().getPlainText().split(" ").length +
            1}
          자
        </span>
      </div>
      <div className={styles.editorOuterContainer}>
        <div className={styles.editorContainer} onClick={focusEditor}>
          <DraftEditor
            ref={editorRef}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={handleEditorChange}
            placeholder='본문을 입력해주세요'
            blockRendererFn={blockRendererFn}
          />
        </div>
        <ToolBar
          editorState={editorState}
          onEditorChange={handleEditorChange}
          onImageUpload={handleImageUpload}
        />
      </div>
    </div>
  );
};

export default Editor;
