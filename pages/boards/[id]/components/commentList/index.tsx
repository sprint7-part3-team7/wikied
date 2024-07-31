import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Comment } from "@/types/article";
import Image from "next/image";
import defaultProfile from "@/assets/icons/ic_profile.svg";
import editImage from "@/assets/icons/ic_edit.svg";
import deleteImage from "@/assets/icons/ic_delete.svg";

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  const [newComment, setNewComment] = useState("");

  return (
    <div className={styles["comment-container"]}>
      <div className={styles["comment-title"]}>
        댓글 <span>{comments.length}</span>
      </div>

      <form className={styles["comment-input"]}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder='댓글을 입력해 주세요'
        />
        <button type='submit'>댓글 등록</button>
      </form>

      <div className={styles["comment-list"]}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles["comment-box"]}>
            <div className={styles["comment-author-image"]}>
              {comment.writer.image ? (
                <Image
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
            <div className={styles["comment-detail"]}>
              <div className={styles["comment-detail-header"]}>
                <span className={styles["comment-author-name"]}>
                  {comment.writer.name}
                </span>
                <div className={styles["comment-button-wrapper"]}>
                  <button className={styles["comment-button"]}>
                    <Image src={editImage} alt='수정' width={24} height={24} />
                  </button>
                  <button className={styles["comment-button"]}>
                    <Image
                      src={deleteImage}
                      alt='삭제'
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              </div>
              <p className={styles["comment-content"]}>{comment.content}</p>
              <span className={styles["comment-date"]}>
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
