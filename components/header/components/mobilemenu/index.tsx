import { useEffect, useRef } from 'react';
import styles from '@/components/header/components/MobileMenu/styles.module.scss';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthProvider';

type MenuProps = {
  handleMenuClose: () => void;
};

const MobileMenu = ({ handleMenuClose }: MenuProps) => {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

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
      <button className={styles['menu-list']}>알림</button>
      {/* 알림창 나오는 부분은 추가 구현 필요 */}
      <button
        className={styles['menu-list']}
        onClick={() => handleNavigation('/mypage')}
      >
        마이페이지
      </button>
      <button className={styles['menu-list']} onClick={handleLogoutClick}>
        로그아웃
      </button>
    </div>
  );
};

export default MobileMenu;
