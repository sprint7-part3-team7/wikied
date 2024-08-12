import Link from 'next/link';
import styles from './styles.module.scss';
import { ProfileSummary } from '@/types/wiki';
import DefaultProfileImg from '@/assets/icons/ic_profile.svg';
import UserWikiLink from '@/components/wikilist/userWikiList/userWikiCard/userWikiLink';
import Image from 'next/image';

interface UserCardProps {
  user: ProfileSummary;
}

const UserWikiCard = ({ user }: UserCardProps) => {
  return (
    <div className={styles['user-card-container']}>
      <Link className={styles['user-card']} href={`/wiki/${user.code}`}>
        {user.image ? (
          <img
            src={user.image}
            alt="프로필 이미지"
            width={85}
            height={85}
            className={styles['profile-image']}
          />
        ) : (
          <Image
            src={DefaultProfileImg}
            alt="프로필 이미지"
            width={85}
            height={85}
            className={styles['profile-image']}
          />
        )}

        <div className={styles['user-info']}>
          <div className={styles['user-name']}>{user.name}</div>
          <div className={styles['user-details']}>
            <div>
              {user.city}, {user.nationality}
            </div>
            <div>{user.job}</div>
          </div>
        </div>
      </Link>
      <div className={styles['user-link-container']}>
        <UserWikiLink url={`https://www.wikied.kr/wiki/${user.code}`} />
      </div>
    </div>
  );
};

export default UserWikiCard;
