import { Profile, ProfileRequest, UserInfo } from '@/types/profile';
import { ProfileDetail, ProfileEditStatus, ProfileSummary } from '@/types/wiki';
import {
  authAxiosInstance,
  publicAxiosInstance,
} from '@/services/api/axiosInstance';

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

export const addProfiles = (profileData: ProfileRequest) => {
  return authAxiosInstance.post<Profile>('/profiles', profileData);
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

export const updateProfile = (
  code: string,
  payload: {
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
  return authAxiosInstance.patch<ProfileDetail>(`/profiles/${code}`, payload);
};

export const imageFileToUrl = (image: File) => {
  const formData = new FormData();
  formData.append('image', image);
  return authAxiosInstance.post<{ url: string }>('/images/upload', formData);
};

export const getUserInfo = () => {
  return authAxiosInstance.get<UserInfo>('/users/me');
};
