import axios, { AxiosError } from 'axios';
import { getAccessToken, clearTokens } from '@/shared/utils/token';

const apiClient = axios.create({
  baseURL: 'https://backendcase.infodecs.dev',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(config => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearTokens();
    }

    return Promise.reject(error);
  }
);

export default apiClient;