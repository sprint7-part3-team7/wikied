import Button from '@/components/button';
import Modal from '@/components/modal';
import Alert from '@/components/modal/components/alert';
import { useState } from 'react';

/**
 * @ 모달 사용법 (Alert 기준)
 */

const Example = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <div>
      <Button color="primary" size="large" fullWidth onClick={openModal}>
        모달 열기
      </Button>
      {isModalVisible && (
        <Modal
          size="large"
          contents={({ size }) => (
            <Alert
              title="5분 이상 글을 쓰지 않아 접속이 끊어졌어요."
              description="위키 참여하기를 통해 다시 위키를 수정해 주세요."
              content="확인"
              size={size}
            />
          )}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Example;
