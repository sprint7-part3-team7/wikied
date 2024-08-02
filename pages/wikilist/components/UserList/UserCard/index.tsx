import React from 'react';
import styles from '@/pages/wikilist/components/UserList/UserCard/styles.module.scss';
import { User } from '@/types/user';
import Image from 'next/image';
import DefaultProfileImg from '@/assets/icons/ic_profile.svg';
import UserLink from './userLink';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className={styles['user-card']}>
      <Image src={DefaultProfileImg} alt="User profile" width={85} height={85} className={styles['profile-image']} />
      <div className={styles['user-info']}>
        <div className={styles['user-name']}>{user.name}</div>
        <div className={styles['user-details']}>
          <div>{user.location}</div>
          <div>{user.occupation}</div>
        </div>
      </div>
      <div className={styles['user-link-container']}>
        <UserLink url={user.profileUrl} />
      </div>
    </div>
  );
};

export default UserCard;
