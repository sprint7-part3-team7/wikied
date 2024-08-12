import Link from 'next/link';
import styles from './styles.module.scss';
import { ProfileSummary } from '@/types/wiki';
import DefaultProfileImg from '@/assets/icons/ic_profile.svg';
import UserLink from './userWikiLink';

interface UserCardProps {
  user: ProfileSummary;
}

const UserWikiCard = ({ user }: UserCardProps) => {
  return (
    <div className={styles['user-card-container']}>
      <Link className={styles['user-card']} href={`/wiki/${user.code}`}>
        <img
          src={user.image || DefaultProfileImg}
          alt="프로필 이미지"
          width={85}
          height={85}
          className={styles['profile-image']}
        />
        <div className={styles['user-info']}>
          <div className={styles['user-name']}>{user.name}</div>
          <div className={styles['user-details']}>
            <div>{user.city}, {user.nationality}</div>
            <div>{user.job}</div>
          </div>
        </div>
      </Link>
      <div className={styles['user-link-container']}>
        <UserLink url={`/wiki/${user.code}`} />
      </div>
    </div>
  );
};

export default UserWikiCard;
