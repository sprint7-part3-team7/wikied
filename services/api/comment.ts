import { Comment } from '@/types/article';
import {
  authAxiosInstance,
  publicAxiosInstance,
} from '@/services/api/axiosInstance';

interface CommentResponse {
  list: Comment[];
  nextCursor: string | null;
}

export const getArticleComments = (articleId: number, limit: number = 99) => {
  return publicAxiosInstance.get<CommentResponse>(
    `/articles/${articleId}/comments`,
    {
      params: { limit },
    },
  );
};

export const postComment = (articleId: number, content: string) => {
  return authAxiosInstance.post<Comment>(`/articles/${articleId}/comments`, {
    content,
  });
};

export const patchComment = (commentId: number, content: string) => {
  return authAxiosInstance.patch<Comment>(`/comments/${commentId}`, {
    content,
  });
};

export const deleteComment = (commentId: number) => {
  return authAxiosInstance.delete(`/comments/${commentId}`);
};
