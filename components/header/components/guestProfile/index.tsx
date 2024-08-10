import { useAuth } from '@/contexts/AuthProvider';
import styles from '@/components/header/components/guestProfile/styles.module.scss';
import Link from 'next/link';

const GuestProfile = () => {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {isLoggedIn ? (
        <button className={styles['login']} onClick={handleLogout}>
          로그아웃
        </button>
      ) : (
        <Link href="/login">
          <button className={styles['login']}>로그인</button>
        </Link>
      )}
    </>
  );
};

export default GuestProfile;
