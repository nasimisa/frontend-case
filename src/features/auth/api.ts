import apiClient from '@/shared/api/client';
import { LoginPayload, AuthResponse, User, LogoutPayload } from './types';

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>('/api/auth/login/', payload);
  return data;
};

export const logout = async (payload: LogoutPayload) => {
  await apiClient.post('/api/auth/logout/', payload);
};

export const fetchCurrentUser = async (): Promise<User> => {
  const { data } = await apiClient.get<User>('/api/auth/user/');
  return data;
};
