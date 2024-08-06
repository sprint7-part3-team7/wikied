import styles from '@/components/header/components/list/styles.module.scss';
import Link from 'next/link';

const List = () => {
  return (
    <div className={styles['item-list']}>
      <Link className={styles['wiki']} href="/wikilist">
        위키 목록
      </Link>
      <Link className={styles['boards']} href="/boards">
        자유 게시판
      </Link>
    </div>
  );
};

export default List;
