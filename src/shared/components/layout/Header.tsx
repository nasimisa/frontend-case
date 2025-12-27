'use client';

import { Flex, Text, Button, HStack, Box } from '@chakra-ui/react';
import { useAuth } from '@/features/Auth/useAuth';
import { usePathname, useRouter } from 'next/navigation';
import { ColorModeToggle } from '../ui/ColorModeToggle';
import { NAV_ITEMS, ROUTES } from '@/shared/utils/routes';

export const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.LOGIN);
  };

  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  return (
    <Flex
      px={6}
      py={4}
      bg='surface.header'
      color='text.primary'
      justify='space-between'
      align='center'
    >
      <Flex align='center' gap={8}>
        <Text fontWeight='bold' fontSize='lg'>
          Frontend Case
        </Text>

        <HStack spacing={2}>
          {NAV_ITEMS.map(item => {
            const active = isActive(item.path);

            return (
              <Box
                key={item.path}
                px={4}
                py={2}
                borderRadius='full'
                cursor='pointer'
                fontWeight='semibold'
                bg={active ? 'surface.elevated' : 'transparent'}
                color={active ? 'text.accent' : 'text.secondary'}
                _hover={{
                  bg: active ? 'surface.elevated' : 'surface.hover',
                }}
                transition='all 0.2s'
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </Box>
            );
          })}
        </HStack>
      </Flex>

      <Flex gap={3} align='center'>
        <Text fontSize='sm' fontWeight='medium' color='text.secondary'>
          {user?.username}
        </Text>

        <ColorModeToggle />

        <Button
          size='sm'
          bg='action.primaryBg'
          color='action.primaryText'
          fontWeight='semibold'
          _hover={{
            opacity: 0.9,
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};
