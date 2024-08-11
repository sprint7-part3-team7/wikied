import { ProfileDetail, ProfileEditStatus, ProfileSummary } from '@/types/wiki';
import { authAxiosInstance, publicAxiosInstance } from './axiosInstance';

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

export const checkProfileEditStatus = (code: string) => {
  return authAxiosInstance.get<{ registeredAt: string; userId: number }>(
    `/profiles/${code}/ping`,
  );
};

export const updateProfileEditStatus = (
  code: string,
  payload: { securityAnswer: string },
) => {
  return authAxiosInstance.post<ProfileEditStatus>(
    `/profiles/${code}/ping`,
    payload,
  );
};

export const updateProfile = (code: string, formData: FormData) => {
  return authAxiosInstance.patch<ProfileDetail>(`/profiles/${code}`, formData);
};

export const imageFileToUrl = (image: File) => {
  const formData = new FormData();
  formData.append('image', image);
  return authAxiosInstance.post<{ url: string }>('/images/upload', formData);
};
