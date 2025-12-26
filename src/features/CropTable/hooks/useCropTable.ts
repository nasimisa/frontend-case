'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { getNumberParam, getStringParam } from '../utils';
import { useGetCropTable } from '../api/useGetCropTable';

export const useCropTable = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // derive state from URL
  const page = getNumberParam(searchParams, 'page', 1);
  const pageSize = getNumberParam(searchParams, 'page_size', 10);
  const ordering = searchParams.get('ordering') ?? undefined;

  const crop_name = getStringParam(searchParams, 'crop_name');
  const country = getStringParam(searchParams, 'country');
  const status = getStringParam(searchParams, 'status');
  const search = getStringParam(searchParams, 'search');
  const region = getStringParam(searchParams, 'region');
  const variety = getStringParam(searchParams, 'variety');

  const params = {
    page,
    page_size: pageSize as 10 | 25 | 50 | 100,
    ordering,
    crop_name: crop_name || undefined,
    country: country || undefined,
    region: region || undefined,
    variety: variety || undefined,
    status: status || undefined,
    search: search || undefined,
  };

  const { data, isLoading } = useGetCropTable(params);

  // URL updater
  const updateParams = (next: Record<string, string | number | undefined>) => {
    const current = new URLSearchParams(searchParams.toString());
    const updated = new URLSearchParams(searchParams.toString());

    Object.entries(next).forEach(([key, value]) => {
      if (value === undefined || value === '') {
        updated.delete(key);
      } else {
        updated.set(key, String(value));
      }
    });

    if (current.toString() === updated.toString()) {
      return;
    }

    //  to prevent unnecessary _rcs calls/rerenders
    window.history.pushState({}, '', `${pathname}?${updated.toString()}`);
  };

  return {
    // data
    rows: data?.results ?? [],
    isLoading,
    total: data?.count ?? 0,
    totalPages: data?.total_pages ?? 0,

    // state
    page,
    pageSize,
    ordering,
    crop_name,
    country,
    status,
    search,
    region,
    variety,

    // actions
    setPage: (p: number) => updateParams({ page: p }),
    setPageSize: (s: number) => updateParams({ page_size: s, page: 1 }),
    setOrdering: (o?: string) => updateParams({ ordering: o, page: 1 }),
    setFilters: (filters: {
      crop_name?: string;
      country?: string;
      region?: string;
      variety?: string;
      status?: string;
    }) => updateParams({ ...filters, page: 1 }),
    setSearch: (value: string) => updateParams({ search: value, page: 1 }),
  };
};
