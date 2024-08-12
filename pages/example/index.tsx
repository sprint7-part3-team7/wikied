import Toast from '@/components/toast';
import { useState } from 'react';

/**
 * @ 토스트 컴포넌트 사용법 (
 */

const Example = () => {
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleShowToast = () => {
    setIsToastVisible(true);
  };

  const handleCloseToast = () => {
    setIsToastVisible(false);
  };

  return (
    <>
      <button onClick={handleShowToast}>토스트 UI 보기</button>
      {isToastVisible && (
        <Toast
          message="로그인에 성공했습니다!"
          type="success"
          duration={3000}
          onClose={handleCloseToast}
        />
      )}
    </>
  );
};

export default Example;
