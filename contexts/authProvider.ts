// import axiosInstance from '@/services/api/axiosInstance';
// import { createContext, useState, ReactNode, useContext } from 'react';
// import { useRouter } from 'next/router';
// import {
//   AuthResponseType,
//   LoginFormDataType,
//   SignUpFormDataType,
//   User,
//   UserInfo,
// } from '@/services/types/auth';

// interface AuthContextType {
//   isLoggedIn: boolean;
//   user: UserInfo | undefined;
//   signup: ({ name, email, password, passwordConfirmation }: SignUpFormDataType) => void;
//   login: ({ email, password }: LoginFormDataType) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);



// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState<UserInfo>();
//   const router = useRouter();
//   const [signUpOptions, setSignUpOptions] = useState<SignUpFormDataType>();
//   const [loginOptions, setLoginOptions] = useState<LoginFormDataType>();

//   const getMe = async () => {
//     try {
//       const response = await axiosInstance.get('/users/me');
//       const nextUser = response.data;
//       setUser(nextUser);
//       setIsLoggedIn(true);
//     } catch (error) {
//       console.error('Failed to fetch user data', error);
//     }
//   };

//   const login = async ({ email, password }: LoginFormDataType) => {
//     try {
//       const response = await axiosInstance.post('/auth/signIn', {
//         email,
//         password,
//       });
//       await getMe();
//     } catch (error) {
//       console.error('Failed to login', error);
//     }
//   };

//   const signup = async ({ email, password, name, passwordConfirmation}: SignUpFormDataType) => {
//     try {
//       const response = await axiosInstance.post('/auth/signUp', {
//         name,
//         email,
//         password,
//         passwordConfirmation,
//       });
//     } catch (error) {
//       console.error('Failed to sign up', error);
//     }
//   };

//   return (
    
//     <AuthContext.Provider value={{ isLoggedIn, user, signup, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );


// };



