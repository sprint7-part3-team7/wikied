import axios from "axios";
import { Article } from "../../types/article";

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
