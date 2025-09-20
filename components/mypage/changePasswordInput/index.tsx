import Button from '@/components/common/button';
import Input from '@/components/common/input';
import styles from '@/components/mypage/changePasswordInput/styles.module.scss';
import { ChangePasswordRequest } from '@/types/user';
import { useState, ChangeEvent, useEffect } from 'react';
import useDebounce from '@/hooks/useDebounce/useDebounce';
import { getErrorMessage } from '@/types/authUtils';
import Toast from '@/components/common/toast';

interface FormState {
  currentPassword: string;
  newPassword: string;
  verifyNewPassword: string;
}

interface ErrorState {
  currentPassword?: string;
  newPassword?: string;
  verifyNewPassword?: string;
}

interface ChangePasswordInputProps {
  onChangePassword: (requestData: ChangePasswordRequest) => Promise<boolean>;
}

const ChangePasswordInput = ({
  onChangePassword,
}: ChangePasswordInputProps) => {
  const [formState, setFormState] = useState<FormState>({
    currentPassword: '',
    newPassword: '',
    verifyNewPassword: '',
  });

  const [errors, setErrors] = useState<ErrorState>({});
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const debouncedNewPassword = useDebounce(formState.newPassword, 500);
  const debouncedVerifyNewPassword = useDebounce(
    formState.verifyNewPassword,
    500,
  );

  useEffect(() => {
    // 새 비밀번호 필드의 유효성 검사
    if (debouncedNewPassword) {
      const newPasswordError = getErrorMessage(
        'password',
        debouncedNewPassword,
      );
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPassword: newPasswordError,
      }));
    }

    // 새 비밀번호 확인 필드의 유효성 검사
    if (debouncedVerifyNewPassword) {
      const verifyNewPasswordError = getErrorMessage(
        'passwordConfirmation',
        debouncedVerifyNewPassword,
        debouncedNewPassword,
      );
      setErrors((prevErrors) => ({
        ...prevErrors,
        verifyNewPassword: verifyNewPasswordError,
      }));
    }
  }, [debouncedNewPassword, debouncedVerifyNewPassword]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('handleSubmit 시작');

    const requestData: ChangePasswordRequest = {
      currentPassword: formState.currentPassword,
      password: formState.newPassword,
      passwordConfirmation: formState.verifyNewPassword,
    };

    try {
      const success = await onChangePassword(requestData);

      if (success) {
        setToastMessage('비밀번호 변경이 완료되었습니다 😃');
        setToastType('success');
      } else {
        setToastMessage('비밀번호 변경에 실패했어요 🥲');
        setToastType('error');
      }
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      console.error('비밀번호 변경 중 오류 발생:', error);
      setToastMessage('비밀번호 변경에 실패했어요 🥲');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  };

  return (
    <form className={styles['container']} onSubmit={handleSubmit}>
      <label htmlFor="password" className={styles['label']}>
        비밀번호 변경
      </label>
      <div className={styles['pwd-input-wrapper']}>
        <Input
          id="currentPassword"
          name="currentPassword"
          placeholder="기존 비밀번호"
          value={formState.currentPassword}
          onChange={handleChange}
          type="password"
          fullWidth
          errorMessage={errors.currentPassword}
        />
        <Input
          id="newPassword"
          name="newPassword"
          value={formState.newPassword}
          placeholder="새 비밀번호"
          onChange={handleChange}
          type="password"
          fullWidth
          errorMessage={errors.newPassword}
        />
        <Input
          id="verifyNewPassword"
          name="verifyNewPassword"
          value={formState.verifyNewPassword}
          placeholder="새 비밀번호 확인"
          onChange={handleChange}
          type="password"
          fullWidth
          errorMessage={errors.verifyNewPassword}
        />
      </div>
      <Button color="primary" size="small" alignEnd defaultPadding>
        변경하기
      </Button>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </form>
  );
};

export default ChangePasswordInput;
