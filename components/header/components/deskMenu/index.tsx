import { useEffect, useRef } from 'react';
import styles from '@/components/header/components/DeskMenu/styles.module.scss';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthProvider';

type MenuProps = {
  handleMenuClose: () => void;
};

const DeskMenu = ({ handleMenuClose }: MenuProps) => {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();
  const { user } = useAuth();
  const code = user && user?.profile?.code;
  

  const handleNavigation = (path: string) => {
    router.push(path);
    handleMenuClose();
  };


  const handleNavigationWiki = (path: string) => {
    if(user && user?.profile?.code) {
      router.push(path);
    } else {
      router.push('/mypage');
    }
    handleMenuClose();
  };



  const handleLogoutClick = () => {
    logout();
    handleMenuClose();
  };

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
        onClick={() => handleNavigation('/mypage')}
      >
        계정 설정
      </button>
      <button
        className={styles['menu-list']}
        onClick={() => handleNavigationWiki(`/wiki/${code}`)}
      >
        내 위키
      </button>
      <button className={styles['menu-list']} onClick={handleLogoutClick}>
        로그아웃
      </button>
    </div>
  );
};

export default DeskMenu;
