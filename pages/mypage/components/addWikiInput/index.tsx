import Input from "@/components/input";
import styles from "@/pages/mypage/components/addWikiInput/styles.module.scss";
import { useState } from "react";

const AddWikiInput = () => {
  /**
   * @ 임시로 만든 질문 로직
   */
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form className={styles["container"]} onSubmit={handleSubmit}>
      <label htmlFor="wiki" className={styles["label"]}>
        위키 생성하기
      </label>
      <div className={styles["wiki-input-wrapper"]}>
        <Input
          id="wiki-question"
          name="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          type="text"
          placeholder="질문을 입력해 주세요"
          fullWidth
        />
        <Input
          id="wiki-answer"
          name="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          type="text"
          placeholder="답을 입력해 주세요"
          fullWidth
        />
      </div>
      <button type="submit" className={styles["button"]}>
        생성하기
      </button>
    </form>
  );
};

export default AddWikiInput;
