import Button from '@/components/button';
import styles from '@/pages/mypage/components/addWikiInput/styles.module.scss';

const AddWikiInput = () => {
  return (
    <form className={styles['container']}>
      <label htmlFor="wiki" className={styles['label']}>
        위키 생성하기
      </label>
      <div className={styles['wiki-input-wrapper']}>
        <input
          id="wiki"
          name="question"
          type="text"
          className={styles['wiki-input']}
          placeholder="질문을 입력해 주세요"
        />
        <input
          id="wiki"
          name="answer"
          type="text"
          className={styles['wiki-input']}
          placeholder="답을 입력해 주세요"
        />
      </div>
      <Button color="primary" size="small" defaultPadding alignEnd>
        생성하기
      </Button>
    </form>
  );
};

export default AddWikiInput;
