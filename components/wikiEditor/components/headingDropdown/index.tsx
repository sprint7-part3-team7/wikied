import React, { useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import arrowIcon from '@/assets/icons/ic_arrow.svg';

interface HeadingDropdownProps {
  onHeadingSelect: (headingType: string) => void;
  selectedHeading: string;
}

const HeadingDropdown = ({ onHeadingSelect, selectedHeading }: HeadingDropdownProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleHeadingClick = (headingType: string) => {
    onHeadingSelect(headingType);
    setDropdownOpen(false);
  };

  return (
    <div className={styles['dropdown-wrapper']}>
      <button
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        className={styles['dropdown-button']}
      >
        <span className={styles['dropdown-title']}>{selectedHeading || '제목'}</span>
        <Image src={arrowIcon} alt="Heading" width={24} height={24} />
      </button>
      {isDropdownOpen && (
        <div className={styles['dropdown-menu']}>
          <button onClick={() => handleHeadingClick('header-one')}>제목 1</button>
          <button onClick={() => handleHeadingClick('header-two')}>제목 2</button>
          <button onClick={() => handleHeadingClick('header-three')}>제목 3</button>
        </div>
      )}
    </div>
  );
};

export default HeadingDropdown;
