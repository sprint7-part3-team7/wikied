import axiosInstance from './axiosInstance';
import { ProfileDetail, ProfileSummary } from '@/types/wiki';

interface ProfileResponse {
  totalCount: number;
  list: ProfileSummary[];
}

export const getProfiles = (params: {
  page?: number;
  pageSize?: number;
  name?: string;
}) => {
  return axiosInstance.get<ProfileResponse>('/profiles', { params });
};

export const getProfileByCode = (code: string) => {
  return axiosInstance.get<ProfileDetail>(`/profiles/${code}`);
};
