import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { getArticles } from '@/services/api/article';
import { Article } from '@/types/article';
import BestBoardCard from './bestArticleCard';
import Button from '@/components/button';

const BestArticleList = () => {
  const [bestBoards, setBestBoards] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const data = await getArticles({
        page: 1,
        pageSize: 4,
        orderBy: 'like',
      });
      const response = data.data;
      setBestBoards(response.list);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles['best-board-list']}>
      <div className={styles['best-board-header']}>
        <div className={styles['header']}>베스트 게시글</div>
        <Button className={styles['add-board-button']}>게시물 등록하기</Button>
      </div>
      <div className={styles['board-grid']}>
        {bestBoards.map((board) => (
          <BestBoardCard key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
};

export default BestArticleList;
