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
  return axiosInstance
    .get<ArticleResponse>('/articles', { params })
    .then((response) => response.data);
};

export const getArticleById = (articleId: number) => {
  return axiosInstance
    .get<Article>(`/articles/${articleId}`)
    .then((response) => response.data);
};

export const createArticle = (article: {
  title: string;
  content: string;
  image?: string;
}) => {
  return axiosInstance
    .post<Article>('/articles', article)
    .then((response) => response.data);
};

export const updateArticle = (articleId: number, article: {
  title: string;
  content: string;
  image?: string;
}) => {
  return axiosInstance
    .patch<Article>(`/articles/${articleId}`, article)
    .then((response) => response.data);
};

export const deleteArticle = (articleId: number) => {
  return axiosInstance
    .delete<void>(`/articles/${articleId}`)
    .then((response) => response.data);
};