import { useEffect, useRef, useState } from 'react';
import styles from '@/components/header/components/mobileToggle/styles.module.scss';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthProvider';
import EditNotification from '@/components/common/modal/components/editNotification';

type MenuProps = {
  handleMenuClose: () => void;
};

const MobileMenu = ({ handleMenuClose }: MenuProps) => {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<'small' | 'large'>('large');

  const handleNavigation = (path: string) => {
    router.push(path);
    handleMenuClose();
  };

  const { logout } = useAuth();

  const handleLogoutClick = () => {
    logout();
    handleMenuClose();
  };

  // Click outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleMenuClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleMenuClose]);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleResize = () => {
    if (window.innerWidth <= 767) {
      setModalSize('small');
    } else {
      setModalSize('large');
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles['container']} ref={menuRef}>
      <button
        className={styles['menu-list']}
        onClick={() => handleNavigation('/wikilist')}
      >
        위키목록
      </button>
      <button
        className={styles['menu-list']}
        onClick={() => handleNavigation('/boards')}
      >
        자유게시판
      </button>
      <button className={styles['menu-list']} onClick={toggleModal}>
        알림
      </button>
      <button
        className={styles['menu-list']}
        onClick={() => handleNavigation('/mypage')}
      >
        마이페이지
      </button>
      <button className={styles['menu-list']} onClick={handleLogoutClick}>
        로그아웃
      </button>
      {isModalOpen && (
        <EditNotification
          size={modalSize}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default MobileMenu;
