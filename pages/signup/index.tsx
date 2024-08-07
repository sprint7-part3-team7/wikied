import { useState, ChangeEvent, FocusEvent, useEffect } from 'react';
import styles from '@/pages/signup/styles.module.scss';
import Link from 'next/link';
import Input from '@/components/input';
import Button from '@/components/button';
import InputItem from './components/inputitem.tsx/inputItem';
import PasswordInput from './components/passwordInput/passwordInput';
import { SignupInputId, getErrorMessage } from './authUtils';
import useDebounce from '@/hooks/useDebounce/useDebounce';

interface FormState {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}

interface ErrorState {
  email?: string;
  name?: string;
  password?: string;
  passwordConfirmation?: string;
}

const SignupPage = () => {
  const [formState, setFormState] = useState<FormState>({
    email: '',
    name: '',
    password: '',
    passwordConfirmation: '',
  });
  const [errors, setErrors] = useState<ErrorState>({});

  const debouncedPassword = useDebounce(formState.password, 500);
  const debouncedPasswordConfirmation = useDebounce(
    formState.passwordConfirmation,
    500,
  );

  useEffect(() => {
    if (debouncedPassword || debouncedPasswordConfirmation) {
      const passwordError = getErrorMessage('password', debouncedPassword);
      const passwordConfirmationError = getErrorMessage(
        'passwordConfirmation',
        debouncedPasswordConfirmation,
        debouncedPassword,
      );

      setErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordError,
        passwordConfirmation: passwordConfirmationError,
      }));
    }
  }, [debouncedPassword, debouncedPasswordConfirmation]);

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
    const errorMessage = getErrorMessage(
      id as SignupInputId,
      value,
      formState.password,
    );
    setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: getErrorMessage('email', formState.email),
      name: getErrorMessage('name', formState.name),
      password: getErrorMessage('password', formState.password),
      passwordConfirmation: getErrorMessage(
        'passwordConfirmation',
        formState.passwordConfirmation,
        formState.password,
      ),
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => !error);

    if (isValid) {
      // TODO: 회원가입 API
    }
  };

  return (
    <div className={styles['signup-container']}>
      <p className={styles['title']}>회원가입</p>
      <form
        className={styles['form']}
        id="signupForm"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className={styles['name-input-wrapper']}>
          <InputItem
            className={styles['name-input']}
            id="name"
            label="이름"
            value={formState.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="이름을 입력해 주세요"
            errorMessage={errors.name}
          ></InputItem>

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
            type="password"
          ></PasswordInput>
        </div>
      </form>
      <Button className={styles['signup-bts']}>가입하기</Button>
      <div className={styles['logon-wrapper']}>
        <strong>이미 회원이신가요?</strong>
        <Link className={styles['login']} href="/login">
          로그인하기
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
