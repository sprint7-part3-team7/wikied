import styles from '@/components/header/components/userProfile/styles.module.scss';
import Image from 'next/image';
import alarm from '@/assets/icons/ic_alarm_32.svg';
import profile from '@/assets/icons/ic_profile.svg';
import menu from '@/assets/icons/ic_menu.svg';

type UserProfileProps = {
  toggleMenu: () => void;
  toggleLoginMenu: () => void;
};

const UserProfile = ({ toggleMenu,toggleLoginMenu }: UserProfileProps) => {
  return (
    <div className={styles['container']}>
      <button className={styles['alarm']}>
        <Image src={alarm} alt="알림" width={32} height={32} />
      </button>
      <button className={styles['profile']} onClick={toggleLoginMenu}>
        <Image src={profile} alt="프로필" width={32} height={32} />
      </button>
      <button className={styles['menu']} onClick={toggleMenu}>
        <Image src={menu} alt="메뉴" width={24} height={24} />
      </button>
    </div>
  );
};

export default UserProfile;
