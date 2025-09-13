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
      <Link className={styles['user-card-link']} href={`/wiki/${user.code}`}>
        <div className={styles['user-card']}>
          <div className={styles['user-profile-image-container']}>
            {/* 프로필 이미지 */}
            {user.image ? (
              <Image
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
          </div>
          {/* 닉네임 및 정보 */}
          <div className={styles['user-info']}>
            <div className={styles['user-name']}>{user.name}</div>
            <div className={styles['user-details']}>
              <div className={styles['user-address']}>
                {user.city}, {user.nationality}
              </div>
              <div className={styles['user-job']}>{user.job}</div>
            </div>
          </div>
        </div>
      </Link>
      <div className={styles['user-link-container']}>
        <UserWikiLink
          url={`https://www.wikied.kr/wiki/${user.code}`}
          user={user}
        />
      </div>
    </div>
  );
};

export default UserWikiCard;
