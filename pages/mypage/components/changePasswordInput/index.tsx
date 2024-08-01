import styles from "@/pages/mypage/components/changePasswordInput/styles.module.scss";

const ChangePasswordInput = () => {
  return (
    <div className={styles["container"]}>
      <label htmlFor="password" className={styles["label"]}>
        비밀번호 변경
      </label>
      <div className={styles["password-input-wrapper"]}>
        <input
          id="password"
          name="currentPassword"
          type="password"
          className={styles["password-input"]}
          placeholder="기존 비밀번호"
        />
        <input
          id="password"
          name="newPassword"
          type="password"
          className={styles["password-input"]}
          placeholder="새 비밀번호"
        />
        <input
          id="password"
          name="verifyNewPassword"
          type="password"
          className={styles["password-input"]}
          placeholder="새 비밀번호 확인"
        />
      </div>
      <button type="submit" className={styles["button"]}>
        변경하기
      </button>
    </div>
  );
};

export default ChangePasswordInput;
