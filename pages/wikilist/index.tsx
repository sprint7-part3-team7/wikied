import UserList from './components/userList';
import styles from '@/pages/wikilist/styles.module.scss';

const Wikilist = () => {
  return (
    <div className={styles['wikilist-ui']}>
      <UserList />
    </div>
  );
};

export default Wikilist;
