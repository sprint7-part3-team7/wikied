export interface Profile {
  code: string;
  id: number;
}

export interface User {
  profile: Profile;
  updatedAt: string;
  createdAt: string;
  teamId: string;
  name: string;
  id: number;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}
