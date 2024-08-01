import Input from "@/components/input";
import styles from "@/pages/mypage/components/changePasswordInput/styles.module.scss";
import { useState } from "react";

const ChangePasswordInput = () => {
  /**
   * @ 임시로 만든 비밀번호 로직
   */
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyNewPassword, setVerifyNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword !== verifyNewPassword) {
      setError("비밀번호가 일치하지 않습니다.");
    } else {
      setError("");
    }
  };

  return (
    <form className={styles["container"]} onSubmit={handleSubmit}>
      <label htmlFor="password" className={styles["label"]}>
        비밀번호 변경
      </label>
      <Input
        id="password"
        name="currentPassword"
        placeholder="기존 비밀번호"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        type="password"
        fullWidth
      />
      <Input
        id="password"
        name="newPassword"
        value={newPassword}
        placeholder="새 비밀번호"
        onChange={(e) => setNewPassword(e.target.value)}
        type="password"
        fullWidth
      />
      <Input
        id="password"
        name="verifyNewPassword"
        value={verifyNewPassword}
        placeholder="새 비밀번호 확인"
        onChange={(e) => setVerifyNewPassword(e.target.value)}
        type="password"
        fullWidth
        error={error}
      />
      <button type="submit" className={styles["button"]}>
        변경하기
      </button>
    </form>
  );
};

export default ChangePasswordInput;
