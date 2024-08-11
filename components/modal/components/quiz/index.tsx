import Image from 'next/image';
import closeIcon from '@/assets/icons/ic_close.svg';
import lockIcon from '@/assets/icons/ic_lock.svg';
import Input from '@/components/input';
import styles from '@/components/modal/components/quiz/styles.module.scss';
import Button from '@/components/button';
import { useState } from 'react';
import clsx from 'clsx';
import { updateProfileEditStatus } from '@/services/api/profile';

interface QuizProps {
  size?: 'small' | 'large';
  code: string;
  setIsEditable: (editable: boolean) => void;
  setIsModalOpen: (open: boolean) => void;
  securityQuestion: string;
}

const Quiz = ({
  size = 'large',
  code,
  setIsEditable,
  setIsModalOpen,
  securityQuestion,
}: QuizProps) => {
  const [answer, setAnswer] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    try {
      const response = await updateProfileEditStatus(code, {
        securityAnswer: answer,
      });
      setIsEditable(true);
      setIsModalOpen(false);
      setErrorMessage('');
    } catch (error) {
      setIsEditable(false);
      setErrorMessage('정답이 아닙니다. 다시 시도해 주세요.');
    }
  };

  return (
    <>
      <div className={styles['title-wrapper']}>
        <div className={styles['lock-icon-wrapper']}>
          <Image src={lockIcon} alt="자물쇠" width={20} height={20} />
        </div>
        <div className={styles['title']}>
          <p>다음 퀴즈를 맞추고</p>
          <p>위키를 작성해보세요.</p>
        </div>
      </div>
      <div
        className={clsx(styles['input-wrapper'], {
          [styles['error']]: errorMessage,
        })}
      >
        <label className={styles['label']}>{securityQuestion}</label>
        <Input
          id="answer"
          name="answer"
          type="text"
          placeholder="답안을 입력해 주세요"
          fullWidth
          errorMessage={errorMessage}
          onChange={handleInputChange}
        />
      </div>
      <Button color="primary" size="small" fullWidth onClick={handleSubmit}>
        확인
      </Button>
      <div className={styles['description']}>
        <p>위키드는 지인들과 함께하는 즐거운 공간입니다.</p>
        <p>지인에게 상처를 주지 않도록 작성해 주세요.</p>
      </div>
    </>
  );
};

export default Quiz;
