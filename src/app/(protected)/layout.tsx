'use client';

import { ProtectedLayout } from '@/shared/components/layout/ProtectedLayout';
import { Header } from '@/shared/components/layout/Header';

export default function ProtectedAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedLayout>
      <Header />
      {children}
    </ProtectedLayout>
  );
}
