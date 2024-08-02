import styles from './styles.module.scss';
import { User } from '@/types/user';
import Image from 'next/image';
import DefaultProfileImg from '@/assets/icons/ic_profile.svg';
import UserLink from './UserLink';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className={styles.userCard}>
      <Image src={DefaultProfileImg} alt="User profile" width={85} height={85} className={styles.profileImage} />
      <div className={styles.userInfo}>
        <div className={styles.userName}>{user.name}</div>
        <div className={styles.userDetails}>
          <div>{user.location}</div>
          <div>{user.occupation}</div>
        </div>
      </div>
      <div className={styles.userLinkContainer}>
        <UserLink url={user.profileUrl} />
      </div>
    </div>
  );
};

export default UserCard;
