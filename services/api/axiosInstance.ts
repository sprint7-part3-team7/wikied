import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const authAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

authAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

authAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      error.message = '로그인 필요';
    }
    return Promise.reject(error);
  },
);

const publicAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export { authAxiosInstance, publicAxiosInstance };
