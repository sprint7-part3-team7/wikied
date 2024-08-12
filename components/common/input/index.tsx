import clsx from 'clsx';
import styles from '@/components/common/input/styles.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  fullWidth?: boolean;
  className?: string;
}

const Input = ({
  label,
  errorMessage,
  fullWidth = false,
  className,
  ...props
}: InputProps) => {
  return (
    <div
      className={clsx(styles['input-container'], {
        [styles['full-width']]: fullWidth,
      })}
    >
      {label && <label className={styles['label']}>{label}</label>}
      <input
        className={clsx(
          styles['input'],
          { [styles['error']]: errorMessage },
          className,
        )}
        {...props}
      />
      {errorMessage && (
        <p className={styles['error-message']}>{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
