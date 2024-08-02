import UserList from '../userList';
import styles from '@/pages/wikilist/components/WikiListUI/styles.module.scss';

const WikilistUI = () => {
  return (
    <div className={styles['wikilist-ui']}>
      <UserList />
    </div>
  );
};

export default WikilistUI;
