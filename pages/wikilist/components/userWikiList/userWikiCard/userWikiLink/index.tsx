import React from 'react';
import styles from '@/pages/wikilist/components/UserList/UserCard/UserLink/styles.module.scss';
import LinkIcon from '@/assets/icons/ic_link.svg';
import Image from 'next/image';

interface UserLinkProps {
  url: string;
}

const UserLink = ({ url }: UserLinkProps) => {
  return (
    <div className={styles['link-container']}>
      <Image src={LinkIcon} alt="Link icon" width={20} height={20} />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles['link-text']}
      >
        {url}
      </a>
    </div>
  );
};

export default UserLink;
