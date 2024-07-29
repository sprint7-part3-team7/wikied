// import WikiComponents from '@/pages/wiki/components/wikiComponents';
import WikiHeader from '@/pages/wiki/components/wikiHeader';
import styles from '@/pages/wiki/styles.module.scss';

const Wiki = () => {
  return (
    <div className={styles['container']}>
      <nav className={styles['nav']}>임시 네비게이션</nav>
      <main>
        <WikiHeader className={styles['wiki-header']} />
      </main>
    </div>
  );
};

export default Wiki;
