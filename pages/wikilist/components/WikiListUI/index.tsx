import UserList from '../UserList';
import styles from './styles.module.scss';

const WikilistUI = () => {
  return (
    <div className={styles.wikilistUI}>
      <UserList />
    </div>
  );
};

export default WikilistUI;
