import React, { useState, useEffect } from 'react';
import { getProfiles } from '@/services/api/wiki';
import { Profile } from '@/types/wiki';
import WikiHeader from '@/pages/wiki/components/wikiHeader';
import WikiArticle from '@/pages/wiki/components/wikiArticle';
import WikiAside from '@/pages/wiki/components/wikiAside';
import styles from '@/pages/wiki/styles.module.scss';

interface WikiProps {
  className?: string;
  code: string;
}
const Wiki: React.FC<WikiProps> = ({ className, code }) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  async function getList(code: string) {
    try {
      const code = 'c9dbd714-cd72-4427-b982-ba44dc15ec91';
      const data = await getProfiles(code);
      setProfile(data);
    } catch (err) {
      console.error('데이터를 가져오는 중 오류가 발생했습니다:', err);
    }
  }

  useEffect(() => {
    getList(code);
  }, [code]);

  return (
    <div className={styles['container']}>
      <main className={styles['wiki-main']}>
        <div className={styles['wiki-padding']}></div>
        <section className={styles['wiki-section']}>
          <WikiHeader className={styles['wiki-header']} profile={profile} />
          <WikiArticle className={styles['wiki-article']} />
        </section>
        <WikiAside className={styles['wiki-aside']} profile={profile} />
      </main>
    </div>
  );
};

export default Wiki;
