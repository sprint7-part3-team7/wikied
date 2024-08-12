import styles from './styles.module.scss';
import Image from 'next/image';
import NotFoundImage from '@/assets/images/landing/landing_9.png';

const NotFound = ({ searchTerm }: { searchTerm: string }) => {
  return (
    <div className={styles['not-found-container']}>
      <p>"{searchTerm}"과 일치하는 검색 결과가 없어요.</p>
      <Image src={NotFoundImage} alt="Not Found" width={200} height={200} />
    </div>
  );
};

export default NotFound;
