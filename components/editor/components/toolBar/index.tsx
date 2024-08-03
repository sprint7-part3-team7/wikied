import React from 'react';
import Image from 'next/image';
import { EditorState, RichUtils } from 'draft-js';
import {
  isTextLeftAligned,
  isTextCenterAligned,
  isTextRightAligned,
  toggleTextAlign,
} from 'contenido';
import styles from './styles.module.scss';

import boldIcon from '@/assets/icons/ic_bold.svg';
import italicIcon from '@/assets/icons/ic_italic.svg';
import underlineIcon from '@/assets/icons/ic_underline.svg';
import alignLeft from '@/assets/icons/align_left.svg';
import alignCenter from '@/assets/icons/align_center.svg';
import alignRight from '@/assets/icons/align_right.svg';
import listBulletIcon from '@/assets/icons/ic_bullet.svg';
import listNumberIcon from '@/assets/icons/ic_number.svg';
import linkIcon from '@/assets/icons/link_gray.svg';
import imageIcon from '@/assets/icons/ic_image.svg';

interface ToolBarProps {
  editorState: EditorState;
  onEditorChange: (editorState: EditorState) => void;
  onImageUpload: () => void;
}

const ToolBar = ({
  editorState,
  onEditorChange,
  onImageUpload,
}: ToolBarProps) => {
  const toggleInlineStyle = (style: string) => {
    onEditorChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType: string) => {
    onEditorChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const handleToggleAlign = (alignment: string) => {
    toggleTextAlign(editorState, onEditorChange, `text-align-${alignment}`);
  };
  return (
    <div className={styles['toolbar']}>
      <div className={styles['left-buttons']}>
        <div className={styles['button-wrapper']}>
          <button onClick={() => toggleInlineStyle('BOLD')}>
            <Image src={boldIcon} alt="Bold" width={24} height={24} />
          </button>
          <button onClick={() => toggleInlineStyle('ITALIC')}>
            <Image src={italicIcon} alt="Italic" width={24} height={24} />
          </button>
          <button onClick={() => toggleInlineStyle('UNDERLINE')}>
            <Image src={underlineIcon} alt="Underline" width={24} height={24} />
          </button>
        </div>
        <div className={styles['button-wrapper']}>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleToggleAlign('left');
            }}
            className={`${styles['align-button']} ${
              isTextLeftAligned(editorState) ? styles['active'] : ''
            }`}
          >
            <Image src={alignLeft} alt="Align Left" width={24} height={24} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleToggleAlign('center');
            }}
            className={`${styles['align-button']} ${
              isTextCenterAligned(editorState) ? styles['active'] : ''
            }`}
          >
            <Image
              src={alignCenter}
              alt="Align Center"
              width={24}
              height={24}
            />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleToggleAlign('right');
            }}
            className={`${styles['align-button']} ${
              isTextRightAligned(editorState) ? styles['active'] : ''
            }`}
          >
            <Image src={alignRight} alt="Align Right" width={24} height={24} />
          </button>
        </div>
        <div className={styles['button-wrapper']}>
          <button onClick={() => toggleBlockType('unordered-list-item')}>
            <Image
              src={listBulletIcon}
              alt="Bullet List"
              width={24}
              height={24}
            />
          </button>
          <button onClick={() => toggleBlockType('ordered-list-item')}>
            <Image
              src={listNumberIcon}
              alt="Numbered List"
              width={24}
              height={24}
            />
          </button>
          <button onClick={onImageUpload}>
            <Image src={imageIcon} alt="Image" width={24} height={24} />
          </button>
        </div>
      </div>
      <button
        onClick={() => console.log('Link functionality to be implemented')}
        className={styles['link-button']}
      >
        <Image src={linkIcon} alt="Link" width={24} height={24} />
      </button>
    </div>
  );
};

export default ToolBar;
