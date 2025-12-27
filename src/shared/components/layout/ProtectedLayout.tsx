'use client';

import { useAuth } from '@/features/Auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ROUTES } from '@/shared/utils/routes';

export const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(ROUTES.LOGIN);
    }
  }, [isAuthenticated]);

  return <>{children}</>;
};
