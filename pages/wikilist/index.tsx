import styles from '@/pages/wikilist/styles.module.scss';
import UserWikiList from './components/userWikiList';

const Wikilist = () => {
  return (
    <div className={styles['wikilist-ui']}>
      <UserWikiList />
    </div>
  );
};

export default Wikilist;
