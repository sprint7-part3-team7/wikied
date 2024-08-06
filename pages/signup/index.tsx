import styles from '@/pages/signup/styles.module.scss';
import Link from 'next/link';
import Input from '@/components/input';
import Button from '@/components/button';

const SignupPage = () => {
  /**
   * @ ChangePasswordInput, AddWikiInput에 공통 컴포넌트 (Button, Input) 적용해야 함
   */
  return (
    <div className={styles['signup-container']}>
      <p className={styles['title']}>회원가입</p>
      <div className={styles['signup-wrapper']}>
        <Input
            label="이름"
            id="name"
            name="name"
            type="name"
            className={styles['name-input']}
            placeholder="이름을 입력해 주세요"
          ></Input>
          <Input
            label="이메일"
            id="email"
            name="email"
            type="email"
            className={styles['email-input']}
            placeholder="이메일을 입력해 주세요"
          ></Input>
          <Input
            label="비밀번호"
            id="password"
            name="password"
            type="password"
            className={styles['password-input']}
            placeholder="비밀번호를 입력해 주세요"
          ></Input>
          <Input
            label="비밀번호 확인"
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="passwordConfirmation"
            className={styles['passwordConfirmation-input']}
            placeholder="비밀번호를 입력해 주세요"
          ></Input>
        </div>
      <Button className={styles['signup-bts']}>
        가입하기
      </Button>
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
