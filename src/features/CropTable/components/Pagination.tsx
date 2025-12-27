'use client';

import { Box, Button, HStack, Select, Text } from '@chakra-ui/react';
import { useCropTable } from '../hooks';

const PAGE_SIZES = [10, 25, 50, 100];

const getPages = (current: number, total: number, delta = 2) => {
  const pages: number[] = [];

  const start = Math.max(1, current - delta);
  const end = Math.min(total, current + delta);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
};

export const Pagination = () => {
  const { page, pageSize, total, totalPages, setPage, setPageSize } = useCropTable();

  if (totalPages <= 1) return null;

  const pages = getPages(page, totalPages);

  return (
    <Box
      mt={6}
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      flexWrap='wrap'
      gap={4}
    >
      <Text fontSize='sm' color='gray.600'>
        Page {page} of {totalPages} • {total.toLocaleString()} records
      </Text>

      <HStack spacing={2}>
        <Button
          size='sm'
          onClick={() => setPage(page - 1)}
          isDisabled={page === 1}
          variant='outline'
        >
          Previous
        </Button>

        {page > 3 && (
          <Button size='sm' variant='ghost' onClick={() => setPage(1)}>
            1
          </Button>
        )}

        {pages.map(p => (
          <Button
            key={p}
            size='sm'
            variant={p === page ? 'outline' : 'ghost'}
            onClick={() => setPage(p)}
          >
            {p}
          </Button>
        ))}

        {page < totalPages - 2 && (
          <Button size='sm' variant='ghost' onClick={() => setPage(totalPages)}>
            {totalPages}
          </Button>
        )}

        <Button
          size='sm'
          onClick={() => setPage(page + 1)}
          isDisabled={page === totalPages}
          variant='outline'
        >
          Next
        </Button>
      </HStack>

      <HStack>
        <Text fontSize='sm'>Rows per page:</Text>
        <Select
          size='sm'
          width='80px'
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value) as 10 | 25 | 50 | 100)}
        >
          {PAGE_SIZES.map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Select>
      </HStack>
    </Box>
  );
};
