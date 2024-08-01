import axios from 'axios';
import { User } from '@/types/user';

const API_BASE_URL = 'https://wikied-api.vercel.app/6-8/';

export const getUsers = async (page: number, limit: number, search: string): Promise<{ list: User[], totalCount: number }> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`, {
      params: {
        page,
        limit,
        search,
      },
    });
    return {
      list: response.data.users,
      totalCount: response.data.totalCount,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};