import { ProfileDetail, ProfileSummary } from '@/types/wiki';
import { publicAxiosInstance } from './axiosInstance';

interface ProfileResponse {
  totalCount: number;
  list: ProfileSummary[];
}

export const getProfiles = (params: {
  page?: number;
  pageSize?: number;
  name?: string;
}) => {
  return publicAxiosInstance.get<ProfileResponse>('/profiles', { params });
};

export const getProfileByCode = (code: string) => {
  return publicAxiosInstance.get<ProfileDetail>(`/profiles/${code}`);
};
