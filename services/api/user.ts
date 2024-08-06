import axios from 'axios';
import { User } from '@/types/user';

const API_BASE_URL = "https://wikied-api.vercel.app/6-8";

interface UserResponse {
  totalCount: number;
  list: User[];
}

export const getUsers = async (
  page: number,
  limit: number,
  search: string
): Promise<UserResponse> => {
  try {
    const response = await axios.get<UserResponse>(`${API_BASE_URL}/users`, {
      params: {
        page,
        limit,
        search,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserDetail = async (id: number): Promise<User> => {
  try {
    const response = await axios.get<User>(`${API_BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};
