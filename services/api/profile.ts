import axiosInstance from './axiosInstance';
import { Profile } from '@/types/wiki';

interface ProfileResponse {
  totalCount: number;
  list: Profile[];
}

export const getProfiles = (params: {
  page?: number;
  pageSize?: number;
  name?: string;
}) => {
  return axiosInstance.get<ProfileResponse>('/profiles', { params });
};

export const getProfileByCode = (code: string) => {
  return axiosInstance.get<Profile>(`/profiles/${code}`);
};
