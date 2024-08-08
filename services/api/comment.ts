import axiosInstance from './axiosInstance';
import { Comment } from '@/types/article';

interface CommentResponse {
  list: Comment[];
  nextCursor: string | null;
}

export const getArticleComments = (articleId: number, limit: number = 99) => {
  return axiosInstance.get<CommentResponse>(`/articles/${articleId}/comments`, {
    params: { limit },
  });
};

export const postComment = (articleId: number, content: string) => {
  return axiosInstance.post<Comment>(`/articles/${articleId}/comments`, {
    content,
  });
};

export const patchComment = (commentId: number, content: string) => {
  return axiosInstance.patch<Comment>(`/comments/${commentId}`, { content });
};

export const deleteComment = (commentId: number) => {
  return axiosInstance.delete(`/comments/${commentId}`);
};
