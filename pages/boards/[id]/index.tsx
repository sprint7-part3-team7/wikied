import {
  getArticleById,
  updateArticle,
  deleteArticle,
} from '@/services/api/article';
import { getArticleComments } from '@/services/api/comment';
import { Article, Comment } from '@/types/article';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import likeIcon from '@/assets/icons/ic_heart.svg';
import CommentList from './components/commentList';
import Button from '@/components/button';
import editIcon from '@/assets/icons/ic_edit.svg';
import deleteIcon from '@/assets/icons/ic_delete.svg';

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
          const [articleResponse, commentsResponse] = await Promise.all([
            getArticleById(Number(id)),
            getArticleComments(Number(id)),
          ]);

          const articleData = articleResponse.data;
          const commentsData = commentsResponse.data;

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

  const handleEditButtonClick = async () => {
    if (article) {
      try {
        const updatedArticle = await updateArticle(article.id, {
          title: article.title,
          content: article.content,
          image: article.image,
        });
        setArticle(updatedArticle.data);
        alert('게시글이 수정되었습니다.');
      } catch (error) {
        console.error('게시글 수정 실패', error);
        alert('게시글 수정 실패');
      }
    }
  };

  const handleDeleteButtonClick = async () => {
    if (article) {
      try {
        await deleteArticle(article.id);
        alert('게시글이 삭제되었습니다.');
        router.push('/boards');
      } catch (error) {
        console.error('게시글 삭제 실패', error);
        alert('게시글 삭제 실패');
      }
    }
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
                onClick={handleEditButtonClick}
              >
                수정하기
              </Button>
              <Button
                color="primary"
                size="large"
                className={`${styles['header-button']} ${styles['delete']}`}
                onClick={handleDeleteButtonClick}
              >
                삭제하기
              </Button>
              <button
                className={`${styles['header-icon']} ${styles['edit-icon']}`}
                onClick={handleEditButtonClick}
              >
                <Image src={editIcon} alt="Edit" width={24} height={24} />
              </button>
              <button
                className={`${styles['header-icon']} ${styles['delete-icon']}`}
                onClick={handleDeleteButtonClick}
              >
                <Image src={deleteIcon} alt="Delete" width={24} height={24} />
              </button>
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
