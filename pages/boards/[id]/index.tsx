import { getArticleComments, getArticleDetail } from '@/services/api/article';
import { Article, Comment } from '@/types/article';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import likeIcon from '@/assets/icons/ic_heart.svg';
import CommentList from './components/commentList';
import Button from '@/components/button';

const ArticleDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchArticleAndComments = async () => {
        try {
          const [articleData, commentsData] = await Promise.all([
            getArticleDetail(Number(id)),
            getArticleComments(Number(id)),
          ]);
          articleData.content = articleData.content.replace(/<img.*?>/g, '');
          setArticle(articleData);
          setComments(commentsData.list);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchArticleAndComments();
    }
  }, [id]);

  const handleBackButtonClick = () => {
    router.push('/boards');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className={styles['article']}>
      <div className={styles['article-container']}>
        <div className={styles['article-header']}>
          <div className={styles['header-wrapper']}>
            <div className={styles['article-title']}>{article.title}</div>
            <div className={styles['header-button-wrapper']}>
              <Button
                color="primary"
                size="large"
                className={`${styles['header-button']} ${styles['edit']}`}
              >
                수정하기
              </Button>
              <Button
                color="primary"
                size="large"
                className={`${styles['header-button']} ${styles['delete']}`}
              >
                삭제하기
              </Button>
            </div>
          </div>
          <div className={styles['article-info']}>
            <div className={styles['article-description']}>
              <span>{article.writer.name}</span>
              <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            </div>
            <div className={styles['like-count']}>
              <Image src={likeIcon} alt="likeIcon" width={18} />
              <span>{article.likeCount}</span>
            </div>
          </div>
        </div>

        <div className={styles['image']}>
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              width={500}
              height={300}
            />
          )}
        </div>
        <div
          className={styles['content']}
          dangerouslySetInnerHTML={{ __html: article.content }}
        ></div>
      </div>
      <Button
        color="outline"
        size="large"
        className={styles['button-back']}
        onClick={handleBackButtonClick}
      >
        목록으로
      </Button>
      <CommentList comments={comments} />
    </div>
  );
};

export default ArticleDetailPage;
