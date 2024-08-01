import React from 'react';
import styles from './styles.module.scss';
import { User } from '@/types/user'; 
import Image from 'next/image';
import DefaultProfileImg from '@/assets/icons/ic_profile.svg';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className={styles.userCard}>
      <Image src={DefaultProfileImg} alt="User profile" width={40} height={40} />
      <div className={styles.userInfo}>
        <div className={styles.userName}>{user.name}</div>
        <div className={styles.userDetails}>
          {user.location} | {user.occupation}
        </div>
        <a href={user.profileUrl} target="_blank" rel="noopener noreferrer">
          {user.profileUrl}
        </a>
      </div>
    </div>
  );
};

export default UserCard;
