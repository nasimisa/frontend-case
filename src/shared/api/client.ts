import axios from 'axios';
import { getAccessToken } from '@/shared/utils/token';

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

export default apiClient;