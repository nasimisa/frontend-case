'use client';

import { Tr, Th, Icon } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useCropTable } from '../hooks';
import { TABLE_COLUMNS } from '../constants';

const HeaderCell = ({ label, field }: { label: string; field: string }) => {
  const { ordering, setOrdering } = useCropTable();

  const isActive = ordering === field || ordering === `-${field}`;
  const isDesc = ordering === `-${field}`;

  const handleClick = () => {
    if (!isActive) {
      setOrdering(field);
    } else if (!isDesc) {
      setOrdering(`-${field}`);
    } else {
      setOrdering(undefined);
    }
  };

  return (
    <Th
      cursor='pointer'
      userSelect='none'
      whiteSpace='nowrap'
      onClick={handleClick}
      _hover={{ bg: 'gray.50' }}
    >
      {label}
      <Icon
        as={isDesc || !ordering ? TriangleDownIcon : TriangleUpIcon}
        ml={2}
        opacity={isActive ? 1 : 0.25}
        transition='opacity 0.15s'
      />
    </Th>
  );
};

export const TableHeader = () => {
  return (
    <Tr>
      {TABLE_COLUMNS.map(col => (
        <HeaderCell key={col.field} label={col.label} field={col.field} />
      ))}
    </Tr>
  );
};
