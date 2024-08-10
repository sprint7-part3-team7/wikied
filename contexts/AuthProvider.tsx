import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { AuthResponseType, UserInfo } from '@/types/auth';
import { authAxiosInstance } from '@/services/api/axiosInstance';

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserInfo | null;
  login: (authResponse: AuthResponseType) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logInData, setLogInData] = useState<AuthResponseType | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
      getUserMe(accessToken).then(setUser).catch(console.error);
    } else {
      // 수정 필요
    }
  }, [router]);

  const login = (authResponse: AuthResponseType) => {
    setIsLoggedIn(true);
    setLogInData(authResponse);
    localStorage.setItem('accessToken', authResponse.accessToken);
    localStorage.setItem('refreshToken', authResponse.refreshToken);
  };

  const getUserMe = async (accessToken: string | undefined) => {
    try {
      if (accessToken) {
        const response: AxiosResponse<UserInfo> = await authAxiosInstance.get(
          '/users/me',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        return response.data;
      } else {
        {
          throw new Error('AccessToken이 없습니다.');
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        console.error('Response error:', err.response.status);
        console.error('Response data:', err.response.data);
        throw err;
      }
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setLogInData(null);
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
