// import Button from '@/components/button';
// import Input from '@/components/input';
// import styles from '@/pages/mypage/components/changePasswordInput/styles.module.scss';
// import { ChangePasswordRequest } from '@/types/user';
// import { useState } from 'react';

// interface ChangePasswordInputProps {
//   onChangePassword: (requestData: ChangePasswordRequest) => void;
// }

// const ChangePasswordInput = ({
//   onChangePassword,
// }: ChangePasswordInputProps) => {
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [verifyNewPassword, setVerifyNewPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();

//     if (newPassword !== verifyNewPassword) {
//       setError('비밀번호가 일치하지 않습니다.');
//       return;
//     }

//     const requestData: ChangePasswordRequest = {
//       currentPassword,
//       password: newPassword,
//       passwordConfirmation: verifyNewPassword,
//     };

//     onChangePassword(requestData);
//   };

//   return (
//     <form className={styles['container']} onSubmit={handleSubmit}>
//       <label htmlFor="password" className={styles['label']}>
//         비밀번호 변경
//       </label>
//       <Input
//         id="password"
//         name="currentPassword"
//         placeholder="기존 비밀번호"
//         value={currentPassword}
//         onChange={(e) => setCurrentPassword(e.target.value)}
//         type="password"
//         fullWidth
//       />
//       <Input
//         id="password"
//         name="newPassword"
//         value={newPassword}
//         placeholder="새 비밀번호"
//         onChange={(e) => setNewPassword(e.target.value)}
//         type="password"
//         fullWidth
//       />
//       <Input
//         id="password"
//         name="verifyNewPassword"
//         value={verifyNewPassword}
//         placeholder="새 비밀번호 확인"
//         onChange={(e) => setVerifyNewPassword(e.target.value)}
//         type="password"
//         fullWidth
//         errorMessage={error}
//       />
//       <Button color="primary" size="small" alignEnd defaultPadding>
//         변경하기
//       </Button>
//     </form>
//   );
// };

// export default ChangePasswordInput;

import Button from '@/components/button';
import Input from '@/components/input';
import styles from '@/pages/mypage/components/changePasswordInput/styles.module.scss';
import { ChangePasswordRequest } from '@/types/user';
import { useState, ChangeEvent, useEffect } from 'react';
import useDebounce from '@/hooks/useDebounce/useDebounce';
import { SignupInputId, getErrorMessage } from '@/types/authUtils';
import { useAuth } from '@/contexts/AuthProvider';

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

interface LogInData {
  email: string;
  password: string;
}

interface ChangePasswordInputProps {
  onChangePassword: (requestData: ChangePasswordRequest) => void;
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

  const { logInData } = useAuth();

  const debouncedNewPassword = useDebounce(formState.newPassword, 500);
  const debouncedverifyNewPassword = useDebounce(
    formState.verifyNewPassword,
    500,
  );

  useEffect(() => {
    if (formState.currentPassword && logInData) {
      if (formState.currentPassword !== logInData.password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          currentPassword: '기존 비밀번호가 일치하지 않습니다',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          currentPassword: '',
        }));
      }
    }
  }, [formState.currentPassword, logInData?.password]);

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
    if (debouncedverifyNewPassword) {
      const verifyNewPasswordError = getErrorMessage(
        'passwordConfirmation',
        debouncedverifyNewPassword,
        debouncedNewPassword,
      );
      setErrors((prevErrors) => ({
        ...prevErrors,
        verifyNewPassword: verifyNewPasswordError,
      }));
    }
  }, [debouncedNewPassword, debouncedverifyNewPassword]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const requestData: ChangePasswordRequest = {
      currentPassword: formState.currentPassword,
      password: formState.newPassword,
      passwordConfirmation: formState.verifyNewPassword,
    };

    onChangePassword(requestData);
  };
  return (
    <form className={styles['container']} onSubmit={handleSubmit}>
      <label htmlFor="password" className={styles['label']}>
        비밀번호 변경
      </label>
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
      <Button color="primary" size="small" alignEnd defaultPadding>
        변경하기
      </Button>
    </form>
  );
};

export default ChangePasswordInput;
