import { ChangePasswordRequest, User } from '@/types/user';
import { authAxiosInstance } from './axiosInstance';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface UserResponse {
  user: User;
}

export const getUsers = () => {
  return authAxiosInstance.get<UserResponse>('/users/me');
};

export const changePassword = (requestData: ChangePasswordRequest) => {
  return authAxiosInstance.patch<UserResponse>(
    '/users/me/password',
    requestData,
  );
};
