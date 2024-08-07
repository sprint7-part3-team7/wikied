import { ChangeEvent, KeyboardEvent, FocusEvent } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

interface InputItemProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  isTextArea?: boolean;
  errorMessage?: string;
  fullWidth?: boolean;
  className?: string;
  type?: string;
  
}

const InputItem: React.FC<InputItemProps> = ({
  id,
  label,
  fullWidth = false,
  value,
  className,
  onChange,
  onBlur,
  placeholder,
  onKeyDown,
  errorMessage,
  type = 'text',
}) => {
  return (
    <div
      className={clsx(styles['input-container'], {
        [styles['full-width']]: fullWidth,
      })}
    >
      {label && <label className={styles['label']}>{label}</label>}
      <input
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        type={type}
        className={clsx(
          styles['input'],
          { [styles['error']]: errorMessage },
          className,
        )}
      />
      {errorMessage && (
        <p className={styles['error-message']}>{errorMessage}</p>
      )}
    </div>
  );
};

export default InputItem;
