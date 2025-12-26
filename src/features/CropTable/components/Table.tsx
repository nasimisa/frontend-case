'use client';

import { Box, Table as ChakraTable, Thead, Tbody, Tr, Td, Skeleton, Text } from '@chakra-ui/react';
import { useCropTable } from '../hooks/useCropTable';
import { TableHeader } from './TableHeader';

const SKELETON_ROWS = 5;

export const Table = () => {
  const { rows, loading } = useCropTable();

  return (
    <Box overflowX='auto'>
      <ChakraTable variant='simple' size='sm'>
        <Thead>
          <TableHeader />
        </Thead>

        <Tbody>
          {loading && (
            <>
              {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                <Tr key={i}>
                  {Array.from({ length: 8 }).map((__, j) => (
                    <Td key={j}>
                      <Skeleton height='16px' />
                    </Td>
                  ))}
                </Tr>
              ))}
            </>
          )}

          {!loading && rows.length === 0 && (
            <Tr>
              <Td colSpan={8}>
                <Text textAlign='center' py={6} color='gray.500'>
                  No records found
                </Text>
              </Td>
            </Tr>
          )}

          {!loading &&
            rows.map(row => (
              <Tr key={row.id}>
                <Td>{row.id}</Td>
                <Td>{row.crop_name}</Td>
                <Td>{row.variety}</Td>
                <Td>{row.region}</Td>
                <Td>{row.country}</Td>
                <Td textTransform='capitalize'>{row.status}</Td>
                <Td>{row.planting_date}</Td>
                <Td>{row.yield_amount ?? '—'}</Td>
              </Tr>
            ))}
        </Tbody>
      </ChakraTable>
    </Box>
  );
};
