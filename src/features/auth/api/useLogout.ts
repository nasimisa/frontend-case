'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clearTokens, getRefreshToken } from '@/shared/utils/token';
import { LogoutPayload } from '../types';
import apiClient from '@/shared/api/client';

export const logout = async (payload: LogoutPayload) => {
  await apiClient.post('/api/auth/logout/', payload);
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const refresh = getRefreshToken();
      if (refresh) {
        await logout({ refresh });
      }
    },
    onSettled: () => {
      clearTokens();
      queryClient.removeQueries({ queryKey: ['current-user'] });
    },
  });
};
