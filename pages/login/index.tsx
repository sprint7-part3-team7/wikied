import styles from "@/pages/login/styles.module.scss";
import Link from "next/link";

const LoginPage = () => {
  /**
   * @ ChangePasswordInput, AddWikiInput에 공통 컴포넌트 (Button, Input) 적용해야 함
   */
  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-wrapper"]}>
        <p className={styles["title"]}>로그인</p>
        <div className={styles["email-input-wrapper"]}>
          <label htmlFor="email" className={styles["label"]}>
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={styles["email-input"]}
            placeholder="이메일을 입력해 주세요"
          />
        </div>
        <div className={styles["password-input-wrapper"]}>
          <label htmlFor="password" className={styles["label"]}>
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={styles["password-input"]}
            placeholder="비밀번호를 입력해 주세요"
          />
        </div>
      </div>
      <button type="submit" className={styles["button"]}>
        변경하기
      </button>
      <Link className={styles["signup"]} href="/signup">
        회원가입
      </Link>
    </div>
  );
};

export default LoginPage;
