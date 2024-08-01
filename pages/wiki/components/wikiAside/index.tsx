import React, { useState } from 'react';
import Image from 'next/image';
import { Profile } from '@/types/wiki';
import styles from '@/pages/wiki/components/wikiAside/styles.module.scss';
import expandIcon from '@/assets/icons/ic_expand.svg';

interface WikiAsideProps {
  className?: string;
  profile: Profile;
}

const WikiAside: React.FC<WikiAsideProps> = ({ className, profile }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className={`${styles['user-profile']} ${className}`}>
      <div className={styles['image-container']}>
        <Image
          className={styles['image']}
          src={profile?.image}
          width={200}
          height={200}
          alt='profile image'
        />
      </div>
      <div className={styles['user-attribute-container']}>
        <div className={styles['always-show-user-attribute']}>
          <div className={styles['user-attribute']}>
            <span className={styles['attribute-name']}>거주 도시</span>
            <span className={styles['attribute-value']}>{profile?.city}</span>
          </div>
          <div className={styles['user-attribute']}>
            <span className={styles['attribute-name']}>MBTI</span>
            <span className={styles['attribute-value']}>{profile?.mbti}</span>
          </div>
          <div className={styles['user-attribute']}>
            <span className={styles['attribute-name']}>직업</span>
            <span className={styles['attribute-value']}>{profile?.job}</span>
          </div>
        </div>
        <div className={styles['desktop-user-attribute']}>
          <div className={styles['user-attribute']}>
            <span className={styles['attribute-name']}>SNS 계정</span>
            <span className={styles['attribute-value']}>{profile?.sns}</span>
          </div>
          <div className={styles['user-attribute']}>
            <span className={styles['attribute-name']}>생일</span>
            <span className={styles['attribute-value']}>
              {profile?.birthday}
            </span>
          </div>
          <div className={styles['user-attribute']}>
            <span className={styles['attribute-name']}>별명</span>
            <span className={styles['attribute-value']}>
              {profile?.nickname}
            </span>
          </div>
          <div className={styles['user-attribute']}>
            <span className={styles['attribute-name']}>혈액형</span>
            <span className={styles['attribute-value']}>
              {profile?.bloodType}
            </span>
          </div>
          <div className={styles['user-attribute']}>
            <span className={styles['attribute-name']}>국적</span>
            <span className={styles['attribute-value']}>
              {profile?.nationality}
            </span>
          </div>
        </div>
        {isExpanded && (
          <div className={styles['selective-show-user-attribute']}>
            <div className={styles['user-attribute']}>
              <span className={styles['attribute-name']}>SNS 계정</span>
              <span className={styles['attribute-value']}>{profile?.sns}</span>
            </div>
            <div className={styles['user-attribute']}>
              <span className={styles['attribute-name']}>생일</span>
              <span className={styles['attribute-value']}>
                {profile?.birthday}
              </span>
            </div>
            <div className={styles['user-attribute']}>
              <span className={styles['attribute-name']}>별명</span>
              <span className={styles['attribute-value']}>
                {profile?.nickname}
              </span>
            </div>
            <div className={styles['user-attribute']}>
              <span className={styles['attribute-name']}>혈액형</span>
              <span className={styles['attribute-value']}>
                {profile?.bloodType}
              </span>
            </div>
            <div className={styles['user-attribute']}>
              <span className={styles['attribute-name']}>국적</span>
              <span className={styles['attribute-value']}>
                {profile?.nationality}
              </span>
            </div>
          </div>
        )}
      </div>
      <button className={styles['expand-btn']} onClick={handleToggle}>
        <Image
          className={styles['expand-icon']}
          src={expandIcon}
          width={24}
          height={24}
          alt='profile image'
        />
      </button>
    </div>
  );
};

export default WikiAside;
