import React from 'react';
import styles from '@/pages/wiki/components/wikiArticle/styles.module.scss';

interface WikiArticleProps {
  className?: string;
}

const WikiArticle: React.FC<WikiArticleProps> = ({ className }) => {
  return (
    <div className={`${styles['grid-container']} ${className}`}>
      <div className={styles['grid-item']}>
        <span className={styles['wiki-article-title']}>01. 개요</span>
        <div className={styles['separator']} />
        <span className={styles['wiki-article-content']}>
          코드잇의 콘텐츠 프로듀서이자, 프론트엔드 엔지니어. 포도마켓의
          프론트엔드 엔지니어 출신이다.
        </span>
      </div>
      <div className={styles['grid-item']}>
        <span className={styles['wiki-article-title']}>02. 취미</span>
        <div className={styles['separator']} />
        <span className={styles['wiki-article-content']}>
          내용을 넣어주세요.
        </span>
      </div>
      <div className={styles['grid-item']}>
        <span className={styles['wiki-article-title']}>03. 여담</span>
        <div className={styles['separator']} />
        <span className={styles['wiki-article-content']}>
          내용을 넣어주세요.
        </span>
      </div>
      <div className={styles['grid-item']}>
        <span className={styles['wiki-article-title']}>04. 취향</span>
        <div className={styles['separator']} />
        <span className={styles['wiki-article-content']}>
          내용을 넣어주세요.
        </span>
      </div>
    </div>
  );
};

export default WikiArticle;
