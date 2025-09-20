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
import { useOutsideClick } from '@/hooks/useOutsideClick/useOutsideClick';
import { useModal } from '@/hooks/useModal/useModal';
import { useMenu } from '@/hooks/useMenu/useMenu';

const Header = () => {
  const { isLoggedIn } = useAuth();
  const headerRef = useRef<HTMLElement>(null);

  // 메뉴 상태 관리
  const {
    isMobileMenu,
    setIsMobileMenu,
    isDeskMenuOpen,
    setIsDeskMenuOpen,
    mobileMenu,
    deskMenu,
  } = useMenu();

  // 모달 관련 훅
  const { isModalOpen, closeModal, toggleModal, modalSize } = useModal();

  // 외부 클릭 감지
  const mobileMenuBtnRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick([mobileMenuRef, mobileMenuBtnRef], () => {
    setIsMobileMenu(false);
  });

  const deskMenuBtnRef = useRef<HTMLButtonElement>(null);
  const deskMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick([deskMenuRef, deskMenuBtnRef], () => {
    setIsDeskMenuOpen(false);
  });

  return (
    <header className={styles['container']} ref={headerRef}>
      <div className={styles['logo-item-wrapper']}>
        <Logo />
        <List />
      </div>
      <div className={styles['login-wrapper']}>
        {isLoggedIn ? (
          <UserProfile
            mobileMenu={mobileMenu}
            deskMenu={deskMenu}
            mobileMenuBtnRef={mobileMenuBtnRef}
            deskMenuBtnRef={deskMenuBtnRef}
          />
        ) : (
          <GuestProfile />
        )}
      </div>
      {isMobileMenu && (
        <div ref={mobileMenuRef} style={{ display: 'contents' }}>
          <MobileMenu mobileMenu={mobileMenu} toggleModal={toggleModal} />
        </div>
      )}
      {isDeskMenuOpen && (
        <div ref={deskMenuRef} style={{ display: 'contents' }}>
          <DeskMenu deskMenu={deskMenu} />
        </div>
      )}
      {isModalOpen && (
        <EditNotification
          size={modalSize}
          onClose={() => {
            closeModal();
          }}
        />
      )}
    </header>
  );
};

export default Header;
