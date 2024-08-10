import { useState } from 'react';
import styles from '@/components/header/styles.module.scss';
import Menu from './components/menu';
import Logo from './components/logo';
import List from './components/list';
import GuestProfile from './components/guestProfile';
import UserProfile from './components/userProfile';
import { useAuth } from '@/contexts/AuthProvider';
import LoginMenu from './components/loginMenu';

/**
 * 1. 로그인 기능 완성 되면 로직 변경 필요
 */

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen((prev) => !prev);
//   };

//   return (
//     <header className={styles['container']}>
//       <div className={styles['logo-item-wrapper']}>
//         <Logo />
//         <List />
//       </div>
//       <div className={styles['login-wrapper']}>
//         <GuestProfile />
//         {/* <UserProfile toggleMenu={toggleMenu} /> */}
//       </div>
//       {/* {isMenuOpen && <Menu />} */}
//     </header>
//   );
// };

// export default Header;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeskMenuOpen, setIsDeskMenuOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleLoginMenu = () => {
    setIsDeskMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    setIsDeskMenuOpen(false);
  };


  return (
    <header className={styles['container']}>
      <div className={styles['logo-item-wrapper']}>
        <Logo />
        <List />
      </div>
      <div className={styles['login-wrapper']}>
        {isLoggedIn ? (
          // <UserProfile toggleMenu={toggleLoginMenu} />
          <UserProfile 
            toggleLoginMenu={toggleLoginMenu} 
            toggleMenu={toggleMenu}  
          />
        ) : (
          <GuestProfile />
        )}
      </div>
      {isMenuOpen && <Menu handleMenuClose={handleMenuClose} />}
      {isDeskMenuOpen && <LoginMenu handleMenuClose={handleMenuClose} />}
    </header>
  );
};

export default Header;
