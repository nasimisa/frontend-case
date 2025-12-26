import apiClient from '@/shared/api/client';
import { CropTableResponse } from './types';

export interface FetchCropTableParams {
  page: number;
  page_size: 10 | 25 | 50 | 100;
  ordering?: string;

  crop_name?: string;
  country?: string;
  region?: string;
  variety?: string;
  status?: string;

  search?: string;
  simulate_error?: boolean;
}

export const fetchCropTable = async (params: FetchCropTableParams): Promise<CropTableResponse> => {
  const { data } = await apiClient.get<CropTableResponse>('/api/table/data/', { params });

  return data;
};