import React from 'react';
import UserList from '../UserList';
import styles from './styles.module.scss';

const WikilistUI: React.FC = () => {
  return (
    <div className={styles.wikilistUI}>
      <UserList />
    </div>
  );
};

export default WikilistUI;
