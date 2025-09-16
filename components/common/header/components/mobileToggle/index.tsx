import styles from '@/components/common/header/components/mobileToggle/styles.module.scss';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthProvider';

type MobileMenuProps = {
  mobileMenu: (e: React.MouseEvent<HTMLButtonElement>) => void;
  toggleModal: () => void;
};

const MobileMenu = ({ mobileMenu, toggleModal }: MobileMenuProps) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const { logout } = useAuth();
  const handleLogoutClick = () => {
    logout();
  };

  return (
    <div className={styles['container']}>
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
