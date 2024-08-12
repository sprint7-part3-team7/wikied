import Button from '@/components/common/button';
import Input from '@/components/common/input';
import styles from '@/pages/mypage/components/addWikiInput/styles.module.scss';
import { ProfileRequest } from '@/types/profile';
import { useState } from 'react';

interface AddWikiInputProps {
  onAddWiki: (profileData: ProfileRequest) => Promise<void>;
}

const AddWikiInput = ({ onAddWiki }: AddWikiInputProps) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await onAddWiki({ securityAnswer: answer, securityQuestion: question });
      setQuestion('');
      setAnswer('');
    } catch (error) {
      console.error('위키를 생성하는 데 실패했어요 🙁', error);
    }
  };

  return (
    <form className={styles['container']} onSubmit={handleSubmit}>
      <label htmlFor="wiki" className={styles['label']}>
        위키 생성하기
      </label>
      <div className={styles['wiki-input-wrapper']}>
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
      <Button color="primary" size="small" alignEnd defaultPadding>
        생성하기
      </Button>
    </form>
  );
};

export default AddWikiInput;
