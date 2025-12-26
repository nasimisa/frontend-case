'use client';

import { Box, Input, Select, SimpleGrid, FormControl, FormLabel } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useCropTable } from '../hooks/useCropTable';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { CropStatus } from '../types';

const STATUS_OPTIONS: CropStatus[] = [
  'planned',
  'planted',
  'growing',
  'flowering',
  'harvested',
  'failed',
];

export const Filters = () => {
  const { crop_name, country, region, variety, status, search, setFilters, setSearch } =
    useCropTable();

  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebouncedValue(searchInput, 400);

  // sync debounced search → URL
  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  return (
    <Box mb={6}>
      <SimpleGrid columns={{ base: 1, md: 3, lg: 6 }} spacing={4}>
        <FormControl>
          <FormLabel>Search</FormLabel>
          <Input
            placeholder='Search crops, regions, researchers...'
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Crop</FormLabel>
          <Input
            placeholder='e.g. Wheat'
            value={crop_name}
            onChange={e => setFilters({ crop_name: e.target.value })}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Country</FormLabel>
          <Input
            placeholder='e.g. Brazil'
            value={country}
            onChange={e => setFilters({ country: e.target.value })}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Region</FormLabel>
          <Input
            placeholder='e.g. Central'
            value={region}
            onChange={e => setFilters({ region: e.target.value })}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Variety</FormLabel>
          <Input
            placeholder='e.g. Durum'
            value={variety}
            onChange={e => setFilters({ variety: e.target.value })}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Status</FormLabel>
          <Select
            placeholder='All'
            value={status}
            onChange={e => setFilters({ status: e.target.value })}
          >
            {STATUS_OPTIONS.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </FormControl>
      </SimpleGrid>
    </Box>
  );
};
