import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Profile } from '@/types/wiki';
import styles from '@/pages/wiki/components/wikiHeader/styles.module.scss';
import link from '@/assets/icons/ic_link.svg';

interface WikiHeaderProps {
  className?: string;
  profile: Profile;
}

const WikiHeader: React.FC<WikiHeaderProps> = ({ className, profile }) => {
  return (
    <section className={`${styles['wiki-actions']} ${className}`}>
      <section className={styles['name-and-btn']}>
        <span className={styles['username']}>{profile?.name}</span>
        <button className={styles['participate-btn']}>위키 참여하기</button>
      </section>
      <section className={styles['link']}>
        <section className={styles['link-wrapper']}>
          <Image src={link} width={20} height={20} alt="link icon" />
          <Link href="#" className={styles['link-copy-btn']}>
            <section className={styles['link-address']}>
              https://www.wikied.kr/{profile?.code}
            </section>
          </Link>
        </section>
      </section>
    </section>
  );
};

export default WikiHeader;
