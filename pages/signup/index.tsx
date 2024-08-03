import styles from '@/pages/signup/styles.module.scss';
import Link from 'next/link';

const SignupPage = () => {
  /**
   * @ ChangePasswordInput, AddWikiInput에 공통 컴포넌트 (Button, Input) 적용해야 함
   */
  return (
    <div className={styles['signup-container']}>
      <p className={styles['title']}>회원가입</p>
      <div className={styles['signup-wrapper']}>
        <div className={styles['input-wrapper']}>
          <label htmlFor="name" className={styles['label']}>
            이름
          </label>
          <input
            id="name"
            name="name"
            type="name"
            className={styles['name-input']}
            placeholder="이름을 입력해 주세요"
          />
        </div>
        <div className={styles['input-wrapper']}>
          <label htmlFor="email" className={styles['label']}>
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={styles['email-input']}
            placeholder="이메일을 입력해 주세요"
          />
        </div>
        <div className={styles['input-wrapper']}>
          <label htmlFor="password" className={styles['label']}>
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={styles['password-input']}
            placeholder="비밀번호를 입력해 주세요"
          />
        </div>
        <div className={styles['input-wrapper']}>
          <label htmlFor="password" className={styles['label']}>
            비밀번호 확인
          </label>
          <input
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="passwordConfirmation"
            className={styles['passwordConfirmation-input']}
            placeholder="비밀번호를 입력해 주세요"
          />
        </div>
      </div>
      <button type="submit" className={styles['button']}>
        가입하기
      </button>
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
