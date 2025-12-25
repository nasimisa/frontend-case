'use client';

import { useToast, UseToastOptions } from '@chakra-ui/react';

export const useAppToast = () => {
  const toast = useToast();

  const showToast = ({ title, description, status = 'info' }: UseToastOptions) => {
    toast({
      title,
      description,
      status,
      duration: 4000,
      isClosable: true,
      position: 'top-right',
    });
  };

  return { showToast };
};
