import axiosInstance from './axiosInstance';
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
  return axiosInstance.get<ArticleResponse>('/articles', { params });
};

export const getArticleById = (articleId: number) => {
  return axiosInstance.get<Article>(`/articles/${articleId}`);
};

export const postArticle = (article: {
  title: string;
  content: string;
  image: string | null;
}) => {
  return axiosInstance.post<Article>('/articles', article);
};

export const updateArticle = (
  articleId: number,
  article: {
    title: string;
    content: string;
    image: string | null;
  },
) => {
  return axiosInstance.patch<Article>(`/articles/${articleId}`, article);
};

export const deleteArticle = (articleId: number) => {
  return axiosInstance.delete<void>(`/articles/${articleId}`);
};
