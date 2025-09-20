import Image from 'next/image';
import { EditorState, RichUtils } from 'draft-js';
import {
  isTextLeftAligned,
  isTextCenterAligned,
  isTextRightAligned,
  toggleTextAlign,
} from 'contenido';
import ColorPalette from '@/components/common/wikiEditor/components/colorPalette';
import styles from '@/components/common/wikiEditor/components/toolBar/styles.module.scss';

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
import HeadingDropdown from '@/components/common/wikiEditor/components/headingDropdown';
import { ProfileDetail } from '@/types/wiki';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

interface ToolBarProps {
  editorState: EditorState;
  onEditorChange: (editorState: EditorState) => void;
  onImageUpload: () => void;
  profile: ProfileDetail;
}

const ToolBar = ({
  editorState,
  onEditorChange,
  onImageUpload,
  profile,
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

  const getHeadingType = (blockType: string) => {
    switch (blockType) {
      case 'header-one':
        return '제목 1';
      case 'header-two':
        return '제목 2';
      case 'header-three':
        return '제목 3';
      default:
        return '';
    }
  };

  const currentBlockType = RichUtils.getCurrentBlockType(editorState);
  const selectedHeading = getHeadingType(currentBlockType);

  const [isScrollable, setIsScrollable] = useState(false);
  useEffect(() => {
    const toolbar = document.querySelector(`.${styles.toolbar}`);
    if (!toolbar) return;

    const checkScroll = () => {
      setIsScrollable(toolbar.scrollWidth > toolbar.clientWidth);
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  return (
    <div className={clsx(styles.toolbar, { [styles.scroll]: isScrollable })}>
      <span className={styles['user-name']}>{profile.name}</span>
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
          <button className={styles['heading']}>
            <HeadingDropdown
              onHeadingSelect={toggleBlockType}
              selectedHeading={selectedHeading}
            />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleToggleAlign('left');
            }}
            className={`${styles['align-button']} ${
              isTextLeftAligned(editorState) ? styles['active'] : ''
            }`}
          >
            <Image src={alignLeft} alt="왼쪽 정렬" width={24} height={24} />
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
            <Image src={alignCenter} alt="중앙 정렬" width={24} height={24} />
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
            <Image src={alignRight} alt="오른쪽 정렬" width={24} height={24} />
          </button>
        </div>
        <div className={styles['button-wrapper']}>
          <button
            className={styles['bullet-button']}
            onClick={() => toggleBlockType('unordered-list-item')}
          >
            <Image
              src={listBulletIcon}
              alt="불릿 정렬"
              width={24}
              height={24}
            />
          </button>
          <button
            className={styles['number-button']}
            onClick={() => toggleBlockType('ordered-list-item')}
          >
            <Image
              src={listNumberIcon}
              alt="숫자 정렬"
              width={24}
              height={24}
            />
          </button>
          <ColorPalette
            editorState={editorState}
            onEditorChange={onEditorChange}
            className={styles['color-palette-button']}
          />
          <button onClick={onImageUpload}>
            <Image src={imageIcon} alt="Image" width={24} height={24} />
          </button>
          <button className={styles['link-button']}>
            <Image src={linkIcon} alt="Link" width={24} height={24} />
          </button>
        </div>
      </div>
      <div className={styles['pseudo-box']}></div>
    </div>
  );
};

export default ToolBar;
