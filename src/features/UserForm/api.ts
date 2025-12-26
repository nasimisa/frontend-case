import apiClient from '@/shared/api/client';
import { FormPayload } from './types';

export const submitForm = async (payload: FormPayload) => {
  await apiClient.post('/api/form/submit/', payload);
};
