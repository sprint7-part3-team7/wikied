import {
  getArticleById,
  updateArticle,
  deleteArticle,
  postLike,
  deleteLike,
} from '@/services/api/article';
import {
  deleteComment,
  getArticleComments,
  patchComment,
  postComment,
} from '@/services/api/comment';
import { Article, Comment } from '@/types/article';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import likeIcon from '@/assets/icons/ic_heart.svg';
import filledLikeIcon from '@/assets/icons/heart_fill.svg';
import CommentList from './components/commentList';
import Button from '@/components/button';
import editIcon from '@/assets/icons/ic_edit.svg';
import deleteIcon from '@/assets/icons/ic_delete.svg';
import { useAuth } from '@/contexts/AuthProvider';
import DOMPurify from 'dompurify';
import axios from 'axios';

const ArticleDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const articleId = Number(Array.isArray(id) ? id[0] : id);
  const { user } = useAuth();

  const fetchArticle = async () => {
    if (!articleId) return;

    try {
      const articleResponse = await getArticleById(articleId);
      const articleData = articleResponse.data;

      articleData.content = articleData.content.replace(/<img.*?>/g, '');
      setArticle(articleData);

      setIsAuthor(user?.id === articleData.writer.id);
      setIsLiked(articleData.isLiked === true);
    } catch (error) {
      console.error('Failed to fetch article:', error);
      alert('게시글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    if (!articleId) return;

    try {
      const commentsResponse = await getArticleComments(articleId);
      setComments(commentsResponse.data.list);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      alert('댓글을 불러오는데 실패했습니다.');
    }
  };

  useEffect(() => {
    if (articleId) {
      fetchArticle();
      fetchComments();
    }
  }, [articleId, user]);

  const handleAddComment = async (newComment: string) => {
    try {
      await postComment(articleId, newComment);
      await fetchComments();
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        alert(error.message);
      } else {
        alert('댓글 등록에 실패했습니다.');
      }
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      await fetchComments();
    } catch (error) {
      console.error(error);
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  const handleEditComment = async (commentId: number, newContent: string) => {
    try {
      await patchComment(commentId, newContent);
      await fetchComments();
    } catch (error) {
      console.error(error);
      alert('댓글 수정에 실패했습니다.');
    }
  };

  const handleBackButtonClick = () => {
    router.push('/boards');
  };

  const handleEditButtonClick = () => {
    if (article && isAuthor) {
      router.push(`/board/${article.id}/edit`);
    } else {
      alert('게시글 수정 권한이 없습니다.');
    }
  };

  const handleDeleteButtonClick = async () => {
    if (article && isAuthor) {
      if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
        try {
          await deleteArticle(article.id);
          alert('게시글이 삭제되었습니다.');
          router.push('/boards');
        } catch (error) {
          console.error('게시글 삭제 실패', error);
          alert('게시글 삭제에 실패했습니다.');
        }
      }
    } else {
      alert('게시글 삭제 권한이 없습니다.');
    }
  };

  const handleLikeButtonClick = async () => {
    if (!article) return;

    try {
      if (isLiked) {
        await deleteLike(article.id);
        setIsLiked(false);
        setArticle((prev) =>
          prev ? { ...prev, likeCount: prev.likeCount - 1 } : null,
        );
      } else {
        await postLike(article.id);
        setIsLiked(true);
        setArticle((prev) =>
          prev ? { ...prev, likeCount: prev.likeCount + 1 } : null,
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        alert(error.message);
      } else {
        alert('좋아요 처리에 실패했습니다.');
      }
      fetchArticle();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>게시글이 존재하지 않습니다.</div>;
  }

  return (
    <div className={styles['article']}>
      <div className={styles['article-container']}>
        <div className={styles['article-header']}>
          <div className={styles['header-wrapper']}>
            <div className={styles['article-title']}>{article.title}</div>
            {isAuthor && (
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
            )}
          </div>
          <div className={styles['article-info']}>
            <div className={styles['article-description']}>
              <span>{article.writer.name}</span>
              <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            </div>
            <div className={styles['like-count']}>
              <button
                className={styles['like-button']}
                onClick={handleLikeButtonClick}
              >
                <Image src={isLiked ? filledLikeIcon : likeIcon } alt="likeIcon" width={18} height={18} />
              </button>
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
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(article.content),
          }}
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
      <CommentList
        comments={comments}
        onAddComment={handleAddComment}
        onDeleteComment={handleDeleteComment}
        onEditComment={handleEditComment}
      />
    </div>
  );
};

export default ArticleDetailPage;
