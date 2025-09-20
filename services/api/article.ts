import {
  authAxiosInstance,
  publicAxiosInstance,
} from '@/services/api/axiosInstance';
import { Article } from '@/types/article';

interface ArticleResponse {
  totalCount: number;
  list: Article[];
}

export const getArticles = (params: {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  keyword?: string;
}) => {
  return publicAxiosInstance.get<ArticleResponse>('/articles', { params });
};

export const getArticleById = (articleId: number) => {
  return authAxiosInstance.get<Article>(`/articles/${articleId}`);
};

export const postArticle = (article: {
  title: string;
  content: string;
  image: string | null;
}) => {
  return authAxiosInstance.post<Article>('/articles', article);
};

export const updateArticle = (
  articleId: number,
  article: {
    title: string;
    content: string;
    image: string | null;
  },
) => {
  return authAxiosInstance.patch<Article>(`/articles/${articleId}`, article);
};

export const deleteArticle = (articleId: number) => {
  return authAxiosInstance.delete<void>(`/articles/${articleId}`);
};

export const imageUpload = (formData: FormData) => {
  return authAxiosInstance.post<{ url: string }>('/images/upload', formData);
};

export const postLike = (articleId: number) => {
  return authAxiosInstance.post<void>(`/articles/${articleId}/like`);
};

export const deleteLike = (articleId: number) => {
  return authAxiosInstance.delete<void>(`/articles/${articleId}/like`);
};
