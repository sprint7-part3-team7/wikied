import { useState, ChangeEvent, FocusEvent, useEffect } from 'react';
import styles from '@/pages/login/styles.module.scss';
import Link from 'next/link';
import Button from '@/components/button';
import InputItem from './components/inputitem.tsx/inputItem';
import PasswordInput from './components/passwordInput/passwordInput';
import { LoginInputId, getErrorMessage } from './authUtils';
import useDebounce from '@/hooks/useDebounce/useDebounce';

interface FormState {
  email: string;
  password: string;
}

interface ErrorState {
  email?: string;
  password?: string;
}

const LoginPage: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<ErrorState>({});

  const debouncedPassword = useDebounce(formState.password, 500);

  useEffect(() => {
    if (debouncedPassword) {
      const passwordError = getErrorMessage('password', debouncedPassword);

      setErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordError,
      }));
    }
  }, [debouncedPassword]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    const errorMessage = getErrorMessage(id as LoginInputId, value);
    setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      email: getErrorMessage('email', formState.email),
      password: getErrorMessage('password', formState.password),
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => !error);

    if (isValid) {
      // TODO: 로그인 API
    }
  };

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-wrapper']}>
        <p className={styles['title']}>로그인</p>
        <form className={styles['form']} id="loginForm" method="post" onSubmit={handleSubmit}>
          <div className={styles['email-input-wrapper']}>
            <InputItem
              className={styles['email-input']}
              id="email"
              label="이메일"
              value={formState.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="이메일을 입력해 주세요"
              errorMessage={errors.email}
            ></InputItem>
          </div>
          <div className={styles['password-input-wrapper']}>
            <PasswordInput
              className={styles['password-input']}
              id="password"
              label="비밀번호"
              value={formState.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="비밀번호를 입력해 주세요"
              errorMessage={errors.password}
              type='password'
              ></PasswordInput>

            
          </div>
        </form>
      </div>
      <Button className={styles['login-bts']}>로그인</Button>
      <Link className={styles['signup']} href="/signup">
        회원가입
      </Link>
    </div>
  );
};

export default LoginPage;
