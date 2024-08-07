import styles from '@/components/modal/styles.module.scss';
import clsx from 'clsx';

interface ModalProps {
  children: React.ReactNode;
  size?: 'small' | 'large';
}

const Modal = ({ children, size = 'large' }: ModalProps): JSX.Element => {
  return (
    <div className={clsx(styles['container'], styles[size])}>{children}</div>
  );
};

export default Modal;
