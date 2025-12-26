'use client';

import { Box, Input, Select, SimpleGrid, FormControl, FormLabel } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useCropTable } from '../hooks/useCropTable';
import { CropStatus } from '../types';
import { useDebounce } from '@/shared/hooks/useDebounce';

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

  const [textFilters, setTextFilters] = useState({
    search,
    crop_name,
    country,
    region,
    variety,
  });

  const debouncedFilters = useDebounce(textFilters, 400);

  useEffect(() => {
    setSearch(debouncedFilters.search);

    setFilters({
      crop_name: debouncedFilters.crop_name,
      country: debouncedFilters.country,
      region: debouncedFilters.region,
      variety: debouncedFilters.variety,
    });
  }, [debouncedFilters, setFilters, setSearch]);

  return (
    <Box mb={6}>
      <SimpleGrid columns={{ base: 1, md: 3, lg: 6 }} spacing={4}>
        <FormControl>
          <FormLabel>Search</FormLabel>
          <Input
            placeholder='Search crops, regions, researchers...'
            value={textFilters.search}
            onChange={e =>
              setTextFilters(prev => ({
                ...prev,
                search: e.target.value,
              }))
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Crop</FormLabel>
          <Input
            placeholder='e.g. Wheat'
            value={textFilters.crop_name}
            onChange={e =>
              setTextFilters(prev => ({
                ...prev,
                crop_name: e.target.value,
              }))
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Country</FormLabel>
          <Input
            placeholder='e.g. Brazil'
            value={textFilters.country}
            onChange={e =>
              setTextFilters(prev => ({
                ...prev,
                country: e.target.value,
              }))
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Region</FormLabel>
          <Input
            placeholder='e.g. Central'
            value={textFilters.region}
            onChange={e =>
              setTextFilters(prev => ({
                ...prev,
                region: e.target.value,
              }))
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Variety</FormLabel>
          <Input
            placeholder='e.g. Durum'
            value={textFilters.variety}
            onChange={e =>
              setTextFilters(prev => ({
                ...prev,
                variety: e.target.value,
              }))
            }
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
