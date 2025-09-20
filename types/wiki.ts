export interface ProfileSummary {
  id: number;
  code: string;
  image: string;
  city: string;
  nationality: string;
  job: string;
  updatedAt: string;
  name: string;
}

export interface ProfileDetail extends ProfileSummary {
  mbti: string;
  sns: string;
  birthday: string;
  nickname: string;
  bloodType: string;
  family: string;
  content: string;
  securityQuestion: string;
  securityAnswer: string;
  teamId: string;
  isMyProfile?: boolean;
}

export interface ProfileEditStatus {
  registeredAt: string;
  userId: number;
}

export interface updatedProfileData {
  securityAnswer?: string;
  securityQuestion?: string;
  nationality?: string;
  family?: string;
  bloodType?: string;
  nickname?: string;
  birthday?: string;
  sns?: string;
  job?: string;
  mbti?: string;
  city?: string;
  image?: string | null;
  content?: string;
  url: string;
}

export interface Section {
  title: string;
  content: string;
}
