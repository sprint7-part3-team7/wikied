import axios from "axios";
import { Article, Comment } from "@/types/article";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ApiResponse {
  totalCount: number;
  list: Article[];
}

export const getArticles = async (
  page: number,
  pageSize: number,
  orderBy?: string,
  keyword?: string,
): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(`${API_BASE_URL}/articles`, {
      params: {
        page,
        pageSize,
        orderBy,
        keyword,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getArticleDetail = async (id: number): Promise<Article> => {
  try {
    const response = await axios.get<Article>(`${API_BASE_URL}/articles/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

interface CommentResponse {
  list: Comment[];
  nextCursor: string | null;
}

export const getArticleComments = async (
  articleId: number,
  limit: number = 100,
): Promise<CommentResponse> => {
  try {
    const response = await axios.get<CommentResponse>(
      `${API_BASE_URL}/articles/${articleId}/comments`,
      {
        params: { limit },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
