import styles from "@/components/header/components/menu/styles.module.scss";

const Menu = () => {
  return (
    <div className={styles["container"]}>
      <button className={styles["menu-list"]}>위키목록</button>
      <button className={styles["menu-list"]}>자유게시판</button>
      <button className={styles["menu-list"]}>알림</button>
      <button className={styles["menu-list"]}>마이페이지</button>
    </div>
  );
};

export default Menu;
