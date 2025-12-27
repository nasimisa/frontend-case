'use client';

import { useAuth } from '@/features/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ROUTES } from '@/shared/utils';

export const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isFetching } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isFetching && !isAuthenticated) {
      router.replace(ROUTES.LOGIN);
    }
  }, [isFetching, isAuthenticated, router]);

  if (isFetching || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
