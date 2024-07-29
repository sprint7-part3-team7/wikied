import axios from "axios";
import { Board } from "./boardType";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ApiResponse {
  totalCount: number;
  list: Board[];
}

export const getArticles = async (
  page: number,
  pageSize: number,
  orderBy?: string,
  searchTerm?: string,
): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(
      `https://wikied-api.vercel.app/6-8/articles`,
      {
        params: {
          page,
          pageSize,
          orderBy,
          searchTerm,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
