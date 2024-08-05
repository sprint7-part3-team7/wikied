import axiosInstance from './axiosInstance';
import { Comment } from '@/types/article';

interface CommentResponse {
  list: Comment[];
  nextCursor: string | null;
}

export const getArticleComments = (articleId: number, limit: number = 99) => {
  return axiosInstance
    .get<CommentResponse>(`/articles/${articleId}/comments`, {
      params: { limit },
    })
    .then((response) => response.data);
};
