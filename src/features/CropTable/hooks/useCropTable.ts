'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { fetchCropTable } from '../api';
import { CropRow } from '../types';
import { getNumberParam, getStringParam } from '../utils';

export const useCropTable = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
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

  const [rows, setRows] = useState<CropRow[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchCropTable({
          page,
          page_size: pageSize as 10 | 25 | 50 | 100,
          ordering,
          crop_name: crop_name || undefined,
          country: country || undefined,
          region: region || undefined,
          variety: variety || undefined,
          status: status || undefined,
          search: search || undefined,
        });

        setRows(data.results);
        setTotal(data.count);
        setTotalPages(data.total_pages);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize, ordering, crop_name, country, status, search, region, variety]);

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

    router.push(`${pathname}?${updated.toString()}`);
  };

  return {
    // data
    rows,
    loading,
    total,
    totalPages,

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
