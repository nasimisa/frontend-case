'use client';

import { useAuth } from '@/features/auth/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Spinner, Center } from '@chakra-ui/react';
import { ROUTES } from '@/shared/utils/routes';

export const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(ROUTES.LOGIN);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <Center h='100vh'>
        <Spinner />
      </Center>
    );
  }

  return <>{children}</>;
};
