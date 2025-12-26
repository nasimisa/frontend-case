export type CropStatus = 'planned' | 'planted' | 'growing' | 'flowering' | 'harvested' | 'failed';

export interface CropRow {
  id: number;
  crop_name: string;
  variety: string;
  field_id: string;
  region: string;
  country: string;
  status: CropStatus;
  planting_date: string; // YYYY-MM-DD
  yield_amount: string | null; // decimal as string
  yield_quality_grade?: string;
  researcher_name?: string;
  created_at: string; // ISO datetime
}

export interface CropTableResponse {
  count: number;
  page: number;
  page_size: number;
  total_pages: number;
  next: string | null;
  previous: string | null;
  results: CropRow[];
}