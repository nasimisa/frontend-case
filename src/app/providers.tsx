'use client';

import { ChakraProvider, localStorageManager } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import theme from '@/shared/theme';
import { AuthProvider } from '@/features/auth/AuthContext';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme} colorModeManager={localStorageManager}>
        <AuthProvider>{children}</AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
