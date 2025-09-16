import { useEffect, useRef } from 'react';
import styles from '@/components/common/header/components/deskToggle/styles.module.scss';
import useWikiNavigation from '@/hooks/useCode/useCode';
import { useAuth } from '@/contexts/AuthProvider';
import { useRouter } from 'next/router';

type DeskMenuProps = {
  deskMenu: (e: React.MouseEvent<HTMLButtonElement>) => void;
  toggleMenu: () => void;
  setModalSize: React.Dispatch<React.SetStateAction<'small' | 'large'>>;
};

const DeskMenu = ({ deskMenu, toggleMenu, setModalSize }: DeskMenuProps) => {
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
        onClick={(e) => {
          router.push('/mypage');
          deskMenu(e);
        }}
      >
        계정 설정
      </button>
      <button
        className={styles['menu-list']}
        onClick={(e) => {
          handleNavigationWiki();
          deskMenu(e);
        }}
      >
        내 위키
      </button>
      <button
        className={styles['menu-list']}
        onClick={(e) => {
          handleLogoutClick();
          deskMenu(e);
        }}
      >
        로그아웃
      </button>
    </div>
  );
};

export default DeskMenu;
