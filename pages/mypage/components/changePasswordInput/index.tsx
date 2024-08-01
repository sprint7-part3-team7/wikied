import Button from '@/components/button';
import styles from '@/pages/mypage/components/changePasswordInput/styles.module.scss';

const ChangePasswordInput = () => {
  return (
    <form className={styles['container']}>
      <label htmlFor="password" className={styles['label']}>
        비밀번호 변경
      </label>
      <div className={styles['password-input-wrapper']}>
        <input
          id="password"
          name="currentPassword"
          type="password"
          className={styles['password-input']}
          placeholder="기존 비밀번호"
        />
        <input
          id="password"
          name="newPassword"
          type="password"
          className={styles['password-input']}
          placeholder="새 비밀번호"
        />
        <input
          id="password"
          name="verifyNewPassword"
          type="password"
          className={styles['password-input']}
          placeholder="새 비밀번호 확인"
        />
      </div>
      <Button color="primary" size="small" defaultPadding alignEnd>
        변경하기
      </Button>
    </form>
  );
};

export default ChangePasswordInput;
