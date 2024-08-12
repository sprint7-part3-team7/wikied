import styles from '@/components/header/components/list/styles.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

const List = () => {
  const { pathname } = useRouter();

  return (
    <div className={styles['item-list']}>
      <Link
        className={clsx(styles['link'], {
          [styles['active']]: pathname === '/wikilist',
        })}
        href="/wikilist"
      >
        위키 목록
      </Link>
      <Link
        className={clsx(styles['link'], {
          [styles['active']]: pathname === '/boards',
        })}
        href="/boards"
      >
        자유 게시판
      </Link>
    </div>
  );
};

export default List;