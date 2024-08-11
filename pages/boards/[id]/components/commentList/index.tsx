import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { Comment } from '@/types/article';
import Image from 'next/image';
import defaultProfile from '@/assets/icons/ic_profile.svg';
import editImage from '@/assets/icons/ic_edit.svg';
import deleteImage from '@/assets/icons/ic_delete.svg';
import Button from '@/components/button';
import { postComment } from '@/services/api/comment';
import { useAuth } from '@/contexts/AuthProvider';

interface CommentListProps {
  comments: Comment[];
  articleId: number;
}

const CommentList = ({ comments, articleId }: CommentListProps) => {
  const [newComment, setNewComment] = useState('');
  const maxLength = 500;
  const { user } = useAuth();

  const isCommentAuthor = (comment: Comment) => {
    return user?.id === comment.writer.id;
  };

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    if (input.length <= maxLength) {
      setNewComment(input);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') {
      alert('댓글을 입력해 주세요');
      return;
    } else {
      try {
        await postComment(articleId, newComment);
        setNewComment('');
      } catch (error) {
        console.error(error);
        alert('댓글 등록 실패');
      }
    }
  };

  return (
    <div className={styles['comment-container']}>
      <div className={styles['comment-title']}>
        댓글 <span className={styles['comment-count']}>{comments.length}</span>
      </div>
      <form className={styles['comment-input-container']}>
        <textarea
          className={styles['comment-textarea']}
          value={newComment}
          onChange={handleChangeComment}
          placeholder="댓글을 입력해 주세요"
          maxLength={maxLength}
        />
        <div className={styles['comment-input-footer']}>
          <span className={styles['character-count']}>
            {newComment.length}/{maxLength}
          </span>
          <Button
            color="primary"
            size="large"
            className={styles['submit-button']}
            onClick={handleCommentSubmit}
          >
            댓글 등록
          </Button>
        </div>
      </form>
      <div className={styles['comment-list']}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles['comment-box']}>
            <div className={styles['comment-author-image']}>
              {comment.writer.image ? (
                <img
                  src={comment.writer.image}
                  alt={comment.writer.name}
                  width={50}
                  height={50}
                />
              ) : (
                <Image
                  src={defaultProfile}
                  alt={comment.writer.name}
                  width={50}
                  height={50}
                />
              )}
            </div>
            <div className={styles['comment-detail']}>
              <div className={styles['comment-detail-header']}>
                <span className={styles['comment-author-name']}>
                  {comment.writer.name}
                </span>
                {isCommentAuthor(comment) && (
                  <div className={styles['comment-button-wrapper']}>
                    <button className={styles['comment-button']}>
                      <Image
                        src={editImage}
                        alt="수정"
                        width={24}
                        height={24}
                      />
                    </button>
                    <button className={styles['comment-button']}>
                      <Image
                        src={deleteImage}
                        alt="삭제"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                )}
              </div>
              <p className={styles['comment-content']}>{comment.content}</p>
              <span className={styles['comment-date']}>
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
