import { useEffect, useRef } from 'react';
import styles from '@/components/common/header/components/mobileToggle/styles.module.scss';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthProvider';

type MobileMenuProps = {
  mobileMenu: (e: React.MouseEvent<HTMLButtonElement>) => void;
  toggleModal: () => void;
  setModalSize: React.Dispatch<React.SetStateAction<'small' | 'large'>>;
};

const MobileMenu = ({
  mobileMenu,
  toggleModal,
  setModalSize,
}: MobileMenuProps) => {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const { logout } = useAuth();

  const handleLogoutClick = () => {
    logout();
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
        onClick={(e) => {
          handleNavigation('/wikilist');
          mobileMenu(e);
        }}
      >
        위키목록
      </button>
      <button
        className={styles['menu-list']}
        onClick={(e) => {
          handleNavigation('/boards');
          mobileMenu(e);
        }}
      >
        자유게시판
      </button>
      <button
        className={styles['menu-list']}
        onClick={(e) => {
          toggleModal();
        }}
      >
        알림
      </button>
      <button
        className={styles['menu-list']}
        onClick={(e) => {
          handleNavigation('/mypage');
          mobileMenu(e);
        }}
      >
        마이페이지
      </button>
      <button
        className={styles['menu-list']}
        onClick={(e) => {
          handleLogoutClick();
          mobileMenu(e);
        }}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MobileMenu;
