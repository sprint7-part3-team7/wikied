import styles from '@/components/modal/styles.module.scss';
import closeIcon from '@/assets/icons/ic_close.svg';
import clsx from 'clsx';
import Image from 'next/image';

interface ModalProps {
  children: React.ReactNode;
  size?: 'small' | 'middle' | 'large';
  bgColor?: 'gray';
  hideCloseIcon?: boolean;
}

const Modal = ({
  children,
  size = 'large',
  bgColor,
  hideCloseIcon = false,
}: ModalProps): JSX.Element => {
  return (
    <div
      className={clsx(
        styles['container'],
        styles[size],
        bgColor && styles[`bg-${bgColor}`],
      )}
    >
      {!hideCloseIcon && (
        <Image className={styles['close-image']} src={closeIcon} alt="닫기" />
      )}
      {children}
    </div>
  );
};

export default Modal;
