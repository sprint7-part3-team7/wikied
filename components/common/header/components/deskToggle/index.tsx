import { useEffect, useRef } from 'react';
import styles from '@/components/common/header/components/deskToggle/styles.module.scss';
import useWikiNavigation from '@/hooks/useCode/useCode';
import { useAuth } from '@/contexts/AuthProvider';
import { useRouter } from 'next/router';

const DeskMenu = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();
  const { handleNavigationWiki } = useWikiNavigation();
  const router = useRouter();

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <div className={styles['container']} ref={menuRef}>
      <button
        className={styles['menu-list']}
        onClick={() => {
          router.push('/mypage');
        }}
      >
        계정 설정
      </button>
      <button
        className={styles['menu-list']}
        onClick={() => {
          handleNavigationWiki();
        }}
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
