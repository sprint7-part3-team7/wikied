import WikiHeader from '@/pages/wiki/components/wikiHeader';
import WikiArticle from '@/pages/wiki/components/wikiArticle';
import WikiAside from '@/pages/wiki/components/wikiAside';
import styles from '@/pages/wiki/styles.module.scss';

const Wiki = () => {
  return (
    <div className={styles['container']}>
      <main>
        <WikiHeader className={styles['wiki-header']} />
        <WikiArticle className={styles['wiki-article']} />
        <WikiAside className={styles['wiki-aside']} />
      </main>
    </div>
  );
};

export default Wiki;
