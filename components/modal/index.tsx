import styles from '@/components/modal/styles.module.scss';
import clsx from 'clsx';

interface ModalProps {
  children: React.ReactNode;
  size?: 'small' | 'middle' | 'large';
  bgColor?: 'gray';
}

const Modal = ({
  children,
  size = 'large',
  bgColor,
}: ModalProps): JSX.Element => {
  return (
    <div
      className={clsx(
        styles['container'],
        styles[size],
        bgColor && styles[`bg-${bgColor}`],
      )}
    >
      {children}
    </div>
  );
};

export default Modal;
