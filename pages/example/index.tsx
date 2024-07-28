import styles from "@/pages/example/styles.module.scss";
import ExampleComponents from "./components/exampleComponents";

const Example = () => {
  return (
    <div className={styles["container"]}>
      <p className={styles["fighting"]}>7팀 파이팅!!!</p>
      <ExampleComponents />
    </div>
  );
};

export default Example;
