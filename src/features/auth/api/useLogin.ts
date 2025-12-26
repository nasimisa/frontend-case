'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setTokens } from '@/shared/utils/token';
import { getApiErrorMessage } from '@/shared/utils/error';
import { AuthResponse, LoginPayload } from '../types';
import apiClient from '@/shared/api/client';

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>('/api/auth/login/', payload);
  return data;
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: async ({ access, refresh }) => {
      setTokens(access, refresh);
      await queryClient.invalidateQueries({ queryKey: ['current-user'] });
    },
    onError: error => {
      throw getApiErrorMessage(error);
    },
  });
};
