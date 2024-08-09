import axiosInstance from './axiosInstance';
import { ProfileDetail, ProfileEditStatus, ProfileSummary } from '@/types/wiki';

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

export const checkProfileEditStatus = (code: string) => {
  return axiosInstance.get<{ registeredAt: string; userId: number }>(
    `/profiles/${code}/ping`,
  );
};

export const updateProfileEditStatus = (
  code: string,
  payload: { securityAnswer: string },
  config?: object,
) => {
  return axiosInstance.post<ProfileEditStatus>(
    `/profiles/${code}/ping`,
    payload,
    config,
  );
};
