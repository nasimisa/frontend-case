'use client';

import { useQuery } from '@tanstack/react-query';
import { getAccessToken } from '@/shared/utils/token';
import apiClient from '@/shared/api/client';
import { User } from '../types';

export const fetchCurrentUser = async (): Promise<User> => {
  const { data } = await apiClient.get<User>('/api/auth/user/');
  return data;
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: fetchCurrentUser,
    enabled: !!getAccessToken(),
  });
};
