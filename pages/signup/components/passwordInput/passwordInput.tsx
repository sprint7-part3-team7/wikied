import { ChangeEvent, useState, FocusEvent } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import eyeInvisibleIcon from '@/assets/icons/eye-invisible.svg';
import eyeVisibleIcon from '@/assets/icons/eye-visible.svg';

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  errorMessage?: string;
  fullWidth?: boolean;
  className?: string;
  type?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  errorMessage,
  className,
  fullWidth = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={clsx(styles['input-container'], {
        [styles['full-width']]: fullWidth,
      })}
    >
      {label && <label className={styles['label']}>{label}</label>}

      <div className={styles['input-wrapper']}>
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={clsx(
            styles['input'],
            { [styles['error']]: errorMessage },
            className,
          )}
        />

        {/* <div className={styles['password-tigle-btn']}>
          <button
            className={styles['password-view']}
            type="button"
            onClick={togglePasswordVisibility}
            aria-label="비밀번호 보기"
          >
            <img
              className={styles['password-toggle-icon']}
              src={showPassword ? eyeVisibleIcon : eyeInvisibleIcon}
              alt={
                showPassword
                  ? '비밀번호 표시 상태 아이콘'
                  : '비밀번호 숨김 상태 아이콘'
              }
            />
          </button>
        </div> */}
      </div>

      {errorMessage && (
        <p className={styles['error-message']}>{errorMessage}</p>
      )}
    </div>
  );
};

export default PasswordInput;
