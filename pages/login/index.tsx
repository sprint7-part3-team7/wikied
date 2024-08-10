import { useState, ChangeEvent, FocusEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { publicAxiosInstance } from '@/services/api/axiosInstance';
import styles from '@/pages/login/styles.module.scss';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthProvider';
import { LoginInputId, getErrorMessage } from './authUtils';
import Button from '@/components/button';
import Input from '@/components/input';
import useDebounce from '@/hooks/useDebounce/useDebounce';
import { AuthResponseType } from '@/types/auth';

interface FormState {
  email: string;
  password: string;
}

interface ErrorState {
  email?: string;
  password?: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<ErrorState>({});
  const { login } = useAuth();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      email: getErrorMessage('email', formState.email),
      password: getErrorMessage('password', formState.password),
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => !error);

    if (isValid) {
      try {
        const response = await publicAxiosInstance.post('/auth/signIn', {
          email: formState.email,
          password: formState.password,
        });
        const authResponse: AuthResponseType = response.data;
        login(authResponse);
        console.log('로그인 성공:', response.data);
        alert('로그인이 완료되었습니다.');
        router.push('/landing');
      } catch (error) {
        console.error('로그인 실패:', error);
      }
    }
  };

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-wrapper']}>
        <p className={styles['title']}>로그인</p>
        <form
          className={styles['form']}
          id="loginForm"
          method="post"
          onSubmit={handleSubmit}
        >
          <div className={styles['input-wrapper']}>
            <Input
              id="email"
              label="이메일"
              value={formState.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="이메일을 입력해 주세요"
              errorMessage={errors.email}
            ></Input>
            <Input
              id="password"
              label="비밀번호"
              value={formState.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="비밀번호를 입력해 주세요"
              errorMessage={errors.password}
              type="password"
            ></Input>
          </div>
          <Button color="primary" size="large" fullWidth>
            로그인
          </Button>
        </form>
      </div>

      <Link className={styles['signup']} href="/signup">
        회원가입
      </Link>
    </div>
  );
};

export default LoginPage;
