import React from 'react';
import styles from './styles.module.scss';
import LinkIcon from '@/assets/icons/ic_link.svg';
import Image from 'next/image';

interface UserLinkProps {
  url: string;
}

const UserLink: React.FC<UserLinkProps> = ({ url }) => {
  return (
    <div className={styles.linkContainer}>
      <Image src={LinkIcon} alt="Link icon" width={20} height={20} />
      <a href={url} target="_blank" rel="noopener noreferrer" className={styles.linkText}>
        {url}
      </a>
    </div>
  );
};

export default UserLink;
