'use client';

import { ProtectedLayout } from '@/shared/components/layout/ProtectedLayout';
import { Header } from '@/shared/components/layout/Header';
import { Box } from '@chakra-ui/react';

export default function ProtectedAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedLayout>
      <Header />
      <Box p={4}>{children}</Box>
    </ProtectedLayout>
  );
}
