import { useState } from 'react';
import styles from './styles.module.scss';
import { Comment } from '@/types/article';
import Image from 'next/image';
import defaultProfile from '@/assets/icons/ic_profile.svg';
import editImage from '@/assets/icons/ic_edit.svg';
import deleteImage from '@/assets/icons/ic_delete.svg';
import Button from '@/components/button';
import { useAuth } from '@/contexts/AuthProvider';

interface CommentListProps {
  comments: Comment[];
  onAddComment: (newComment: string) => Promise<void>;
  onDeleteComment: (commentId: number) => Promise<void>;
  onEditComment: (commentId: number, newComment: string) => Promise<void>;
}

const CommentList = ({
  comments,
  onAddComment,
  onDeleteComment,
  onEditComment,
}: CommentListProps) => {
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
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

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') {
      alert('댓글을 입력해 주세요');
      return;
    }
    onAddComment(newComment).catch((error) => {
      console.error('댓글 등록 실패:', error);
      alert('댓글 등록에 실패했습니다.');
    });
    setNewComment('');
  };

  const handleDeleteComment = (commentId: number) => {
    if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      onDeleteComment(commentId).catch((error) => {
        console.error('댓글 삭제 실패:', error);
        alert('댓글 삭제에 실패했습니다.');
      });
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    if (input.length <= maxLength) {
      setEditingContent(input);
    }
  };

  const handleEditClick = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  const handleEditSubmit = (commentId: number) => {
    if (editingContent.trim() === '') {
      alert('댓글 내용을 입력해 주세요');
      return;
    }
    onEditComment(commentId, editingContent)
      .then(() => {
        setEditingCommentId(null);
        setEditingContent('');
      })
      .catch((error) => {
        console.error('댓글 수정 실패:', error);
        alert('댓글 수정에 실패했습니다.');
      });
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
                {isCommentAuthor(comment) &&
                  editingCommentId !== comment.id && (
                    <div className={styles['comment-button-wrapper']}>
                      <button
                        className={styles['comment-button']}
                        onClick={() => handleEditClick(comment)}
                      >
                        <Image
                          src={editImage}
                          alt="수정"
                          width={24}
                          height={24}
                        />
                      </button>
                      <button
                        className={styles['comment-button']}
                        onClick={() => handleDeleteComment(comment.id)}
                      >
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
              {editingCommentId === comment.id ? (
                <div className={styles['edit-comment-container']}>
                  <textarea
                    value={editingContent}
                    onChange={handleEditChange}
                    className={styles['edit-comment-textarea']}
                    maxLength={maxLength}
                  />
                  <div className={styles['edit-comment-footer']}>
                    <span className={styles['character-count']}>
                      {editingContent.length}/{maxLength}
                    </span>
                    <div className={styles['edit-comment-buttons']}>
                      <Button
                        onClick={() => handleEditSubmit(comment.id)}
                        color="primary"
                        size="small"
                      >
                        등록
                      </Button>
                      <Button
                        onClick={handleEditCancel}
                        color="primary"
                        size="small"
                      >
                        취소
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <p className={styles['comment-content']}>{comment.content}</p>
                  <span className={styles['comment-date']}>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
