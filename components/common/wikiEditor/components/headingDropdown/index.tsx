import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import styles from './styles.module.scss';
import arrowIcon from '@/assets/icons/ic_arrow.svg';

interface HeadingDropdownProps {
  onHeadingSelect: (headingType: string) => void;
  selectedHeading: string;
}

const HeadingDropdown = ({
  onHeadingSelect,
  selectedHeading,
}: HeadingDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !wrapperRef.current) return;

    const updatePosition = () => {
      const rect = wrapperRef.current!.getBoundingClientRect();
      setPos({
        top: rect.bottom,
        left: rect.left,
      });
    };

    updatePosition();

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen]);

  const handleHeadingClick = (headingType: string) => {
    onHeadingSelect(headingType);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className={styles['dropdown-wrapper']}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles['dropdown-button']}
      >
        <span className={styles['dropdown-title']}>
          {selectedHeading || '제목'}
        </span>
        <Image src={arrowIcon} alt="Heading" width={24} height={24} />
      </button>

      {isOpen &&
        createPortal(
          <div
            className={styles['dropdown-menu']}
            style={{
              top: pos.top + window.scrollY,
              left: pos.left + window.scrollX - 28,
            }}
          >
            <button onClick={() => handleHeadingClick('header-one')}>
              제목 1
            </button>
            <button onClick={() => handleHeadingClick('header-two')}>
              제목 2
            </button>
            <button onClick={() => handleHeadingClick('header-three')}>
              제목 3
            </button>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default HeadingDropdown;
