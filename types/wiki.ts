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

export interface ProfileDetail {
  image: string;
  city: string;
  mbti: string;
  job: string;
  sns: string;
  birthday: string;
  nickname: string;
  bloodType: string;
  nationality: string;
  family: string;
  code: string;
  name: string;
  content: string;
  updatedAt: string;
  securityQuestion: string;
  teamId: string;
  id: number;
  isMyProfile?: boolean;
}

export interface Section {
  title: string;
  content: string;
}
