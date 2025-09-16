import { useState, useEffect, useRef } from 'react';
import styles from '@/components/common/header/styles.module.scss';
import MobileMenu from './components/mobileToggle';
import Logo from './components/logo';
import List from './components/list';
import GuestProfile from './components/guestProfile';
import UserProfile from './components/userProfile';
import { useAuth } from '@/contexts/AuthProvider';
import DeskMenu from './components/deskToggle';
import EditNotification from '../modal/components/editNotification';

const Header = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [isDeskMenuOpen, setIsDeskMenuOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const headerRef = useRef<HTMLElement>(null);

  const mobileMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMobileMenu((prev) => !prev);
  };

  const deskMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDeskMenuOpen((prev) => !prev);
  };

  const [modalSize, setModalSize] = useState<'small' | 'large'>('large');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMobileMenu(false);
        setIsDeskMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={styles['container']} ref={headerRef}>
      <div className={styles['logo-item-wrapper']}>
        <Logo />
        <List />
      </div>
      <div className={styles['login-wrapper']}>
        {isLoggedIn ? (
          <UserProfile deskMenu={deskMenu} mobileMenu={mobileMenu} />
        ) : (
          <GuestProfile />
        )}
      </div>
      {isMobileMenu && (
        <MobileMenu
          mobileMenu={mobileMenu}
          toggleModal={toggleModal}
          setModalSize={setModalSize}
        />
      )}
      {isDeskMenuOpen && (
        <DeskMenu
          deskMenu={deskMenu}
          toggleMenu={toggleModal}
          setModalSize={setModalSize}
        />
      )}
      {isModalOpen && (
        <EditNotification
          size={modalSize}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
