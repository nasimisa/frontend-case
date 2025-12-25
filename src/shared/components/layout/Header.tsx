'use client';

import { Flex, Text, Button } from '@chakra-ui/react';
import { useAuth } from '@/features/auth/useAuth';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/utils/routes';

export const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.LOGIN);
  };

  return (
    <Flex
      px={6}
      py={4}
      bg='white'
      borderBottom='1px solid'
      borderColor='gray.200'
      justify='space-between'
      align='center'
    >
      <Text fontWeight='bold'>Frontend Case</Text>

      <Flex gap={4} align='center'>
        <Text>{user?.username}</Text>
        <Button size='sm' onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};
