'use client';

import { Filters, Pagination, Table } from './components';

export const CropTable = () => {
  return (
    <>
      <Filters />
      <Table />
      <Pagination />
    </>
  );
};
