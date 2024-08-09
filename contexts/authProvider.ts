import axiosInstance from '@/services/api/axiosInstance';
import { createContext, useState, ReactNode, useContext } from 'react';
import { useRouter } from 'next/router';
import {
  AuthResponseType,
  LoginFormDataType,
  SignUpFormDataType,
  User,
  UserInfo,
} from '@/services/types/auth';

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserInfo | undefined;
  signup: ({ name, email, password, passwordConfirmation }: SignUpFormDataType) => void;
  login: ({ email, password }: LoginFormDataType) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);




export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserInfo>();
  const [signUpOptions, setSignUpOptions] = useState<SignUpFormDataType>();
  const [loginOptions, setLoginOptions] = useState<LoginFormDataType>();
  const router = useRouter();



  const getMe = async () => {
    try {
      const response = await axiosInstance.get('/users/me');
      const nextUser = response.data;
      setUser(nextUser);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  };

  const login = async ({ email, password }: LoginFormDataType) => {
    try {
      const response = await axiosInstance.post(
        '/auth/signIn',
        {
          email: email,
          password: password,
        }
      );
      await getMe();
      console.log('로그인 성공:', response.data);
      router.push('/landing');
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  const signup = async ({ email, password, name, passwordConfirmation}: SignUpFormDataType) => {
    try {
      const response = await axiosInstance.post('/auth/signUp', {
        email: email,
        name: name,
        password: password,
        passwordConfirmation: passwordConfirmation,
      });
      console.log('회원가입 성공:', response.data);
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  return (
    
    <AuthContext.Provider value={{ isLoggedIn, user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



