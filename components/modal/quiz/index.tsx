import Image from 'next/image';
import closeIcon from '@/assets/icons/ic_close.svg';
import lockIcon from '@/assets/icons/ic_lock.svg';
import Input from '@/components/input';
import styles from '@/components/modal/quiz/styles.module.scss';
import Button from '@/components/button';
import { useState } from 'react';
import clsx from 'clsx';

interface QuizProps {
  size?: 'large' | 'small';
}

const Quiz = ({ size = 'large' }: QuizProps) => {
  const [answer, setAnswer] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  /**
   * @ 임시로 답안 설정 (추후 삭제)
   */
  const correctAnswer = '마라탕';

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
    setErrorMessage('');
  };

  const handleSubmit = () => {
    if (answer !== correctAnswer) {
      setErrorMessage('정답이 아닙니다. 다시 시도해 주세요.');
    } else {
      // 정답 시 실행되는 로직 추가하는 자리 (추후 변경)
      alert('정답');
    }
  };

  return (
    <div className={clsx(styles['container'], styles[size])}>
      <Image className={styles['close-image']} src={closeIcon} alt="닫기" />
      <div className={styles['title-wrapper']}>
        <div className={styles['lock-icon-wrapper']}>
          <Image src={lockIcon} alt="자물쇠" width={20} height={20} />
        </div>
        <div className={styles['title']}>
          <p>다음 퀴즈를 맞추고</p>
          <p>위키를 작성해보세요.</p>
        </div>
      </div>
      <div className={styles['input-wrapper']}>
        <label className={styles['label']}>특별히 싫어하는 음식은?</label>
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
    </div>
  );
};

export default Quiz;
