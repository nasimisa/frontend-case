import { ReadonlyURLSearchParams } from 'next/navigation';

export const getNumberParam = (params: ReadonlyURLSearchParams, key: string, fallback: number) => {
  const value = Number(params.get(key));
  return Number.isFinite(value) && value > 0 ? value : fallback;
};

export const getStringParam = (params: ReadonlyURLSearchParams, key: string) => {
  return params.get(key) ?? '';
};
