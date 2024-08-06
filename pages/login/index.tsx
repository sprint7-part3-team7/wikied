import styles from '@/pages/login/styles.module.scss';
import Link from 'next/link';
import Button from '@/components/button';
import Input from '@/components/input';

const LoginPage = () => {
  /**
   * @ ChangePasswordInput, AddWikiInput에 공통 컴포넌트 (Button, Input) 적용해야 함
   */
  return (
    <div className={styles['login-container']}>
      <div className={styles['login-wrapper']}>
        <p className={styles['title']}>로그인</p>
        <div className={styles['email-input-wrapper']}>
          <Input
            label="이메일"
            id="email"
            name="email"
            type="email"
            className={styles['email-input']}
            placeholder="이메일을 입력해 주세요"
          ></Input>
        </div>

        <div className={styles['password-input-wrapper']}>
          <Input
            label="비밀번호"
            id="password"
            name="password"
            type="password"
            className={styles['password-input']}
            placeholder="비밀번호를 입력해 주세요"
          ></Input>
        </div>
      </div>
      <Button className={styles['login-bts']}>로그인</Button>
      <Link className={styles['signup']} href="/signup">
        회원가입
      </Link>
    </div>
  );
};

export default LoginPage;
