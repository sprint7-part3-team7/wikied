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

export const updateProfile = (
  code: string,
  profile: {
    securityAnswer: string;
    securityQuestion: string;
    nationality: string;
    family: string;
    bloodType: string;
    nickname: string;
    birthday: string;
    sns: string;
    job: string;
    mbti: string;
    city: string;
    image: string | null;
    content: string;
  },
) => {
  return axiosInstance.patch<ProfileDetail>(`/profiles/${code}`);
};
