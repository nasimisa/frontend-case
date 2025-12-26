'use client';

import { Filters } from './components/Filters';
import { Pagination } from './components/Pagination';
import { Table } from './components/Table';

export const CropTable = () => {
  return (
    <>
      <Filters />
      <Table />
      <Pagination />
    </>
  );
};
