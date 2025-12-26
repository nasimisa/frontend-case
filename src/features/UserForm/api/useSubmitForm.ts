'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { FormPayload } from '../types';
import apiClient from '@/shared/api/client';

export const submitForm = async (payload: FormPayload) => {
  await apiClient.post('/api/form/submit/', payload);
};

export const useSubmitForm = (options?: UseMutationOptions<void, unknown, FormPayload>) => {
  return useMutation({
    mutationFn: submitForm,
    ...options,
  });
};
