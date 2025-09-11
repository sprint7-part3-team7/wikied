import dynamic from 'next/dynamic';
import Button from '@/components/common/button';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';

const DynamicEditor = dynamic(() => import('@/components/common/editor'), {
  ssr: false,
});

const AddBoard = () => {
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.push('/boards');
  };

  return (
    <div className={styles['add-board-container']}>
      <div className={styles['editor-container']}>
        <DynamicEditor />
      </div>
      <Button
        color="outline"
        size="large"
        className={styles['button-back']}
        onClick={handleBackButtonClick}
      >
        목록으로
      </Button>
    </div>
  );
};

export default AddBoard;
