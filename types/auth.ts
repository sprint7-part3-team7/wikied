export type LoginFormDataType = {
  email: string;
  password: string;
};

export type SignUpFormDataType = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};


export type ChangePasswordFormDataType = {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
};

export type ErrorsType = LoginFormDataType | SignUpFormDataType | ChangePasswordFormDataType;

export type User = {
  id: number;
  email: string;
  image: null | string;
  nickname: string;
  updatedAt: string;
  createdAt: string;
};


export type UserInfo = {
  profile: {
    code: string;
    id: 1;
  };
  updatedAt: string;
  createdAt: string;
  teamId: string;
  name: string;
  id: number;
};

export type AuthResponseType = {
  user: User;
  accessToken: string;
  refreshToken: string;
};