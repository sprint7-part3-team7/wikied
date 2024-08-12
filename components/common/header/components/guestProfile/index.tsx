import styles from '@/components/header/components/guestProfile/styles.module.scss';
import Link from 'next/link';

const GuestProfile = () => {
  return (
    <Link href="/login">
      <button className={styles['login']}>로그인</button>
    </Link>
  );
};

export default GuestProfile;
