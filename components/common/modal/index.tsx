import styles from '@/components/modal/styles.module.scss';
import closeIcon from '@/assets/icons/ic_close.svg';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback } from 'react';

interface ModalProps {
  contents: React.FC<{ size: 'small' | 'large' }>;
  size?: 'small' | 'large';
  onClose?: () => void;
}

const Modal = ({
  contents: Contents,
  size = 'large',
  onClose,
}: ModalProps): JSX.Element => {
  const closeModal = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={styles['overlay']} onClick={handleOverlayClick}>
      <div className={clsx(styles['container'], styles[size])}>
        <button className={styles['close-button']} onClick={closeModal}>
          <Image className={styles['close-image']} src={closeIcon} alt="닫기" />
        </button>
        {<Contents size={size} />}
      </div>
    </div>
  );
};

export default Modal;
