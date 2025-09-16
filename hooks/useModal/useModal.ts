import { useEffect, useState } from 'react';

export const useModal = () => {
  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // 반응형 모달 사이즈 감지
  const [modalSize, setModalSize] = useState<'small' | 'large'>('large');

  useEffect(() => {
    const handleResize = () => {
      setModalSize(window.innerWidth < 768 ? 'small' : 'large');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isModalOpen,
    closeModal,
    toggleModal,
    modalSize,
  };
};
