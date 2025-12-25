import { AxiosError } from 'axios';

export interface ApiError {
  error: string;
  details?: Record<string, unknown>;
}

export interface ErrorMessage {
  title: string;
  message: string;
}

export const getApiErrorMessage = (err: unknown): ErrorMessage => {
  if (err instanceof AxiosError && err.response?.data) {
    const data = err.response.data as ApiError;

    if (typeof data.details?.message === 'string' && typeof data.error === 'string') {
      return { title: data.error, message: data.details.message };
    }
  }

  return { title: 'Error', message: 'An unexpected error occurred. Please try again later.' };
};
