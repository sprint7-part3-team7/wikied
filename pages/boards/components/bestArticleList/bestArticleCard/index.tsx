import Image from 'next/image';
import styles from '../styles.module.scss';
import likeIcon from '@/assets/icons/ic_heart.svg';
import noImage from '@/assets/icons/ic_camera.svg';
import { Article } from '../../../../../types/article';
import { useRouter } from 'next/router';

interface BestArticleCardProps {
  board: Article;
}

const BestArticleCard = ({ board }: BestArticleCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/boards/${board.id}`);
  };

  return (
    <div className={styles['board-card']} onClick={handleClick}>
      {board.image ? (
        <img
          src={board.image}
          alt={board.title}
          className={styles['image']}
          width={250}
          height={131}
        />
      ) : (
        <div className={styles['no-image']}>
        <Image src={noImage} alt="이미지 공백" width={24} height={24} />
      </div>
      )}
      <div className={styles['content']}>
        <div className={styles['content-title']}>{board.title}</div>
        <div className={styles['content-info']}>
          <div className={styles['content-description']}>
            <p>{board.writer.name}</p>
            <p>{new Date(board.createdAt).toLocaleDateString()}</p>
          </div>
          <div className={styles['like-count']}>
            <Image src={likeIcon} alt="likeIcon" width={18} />
            <span>{board.likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestArticleCard;
