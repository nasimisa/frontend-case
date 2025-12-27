'use client';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../schema';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Heading,
} from '@chakra-ui/react';
import { useAuth } from '../useAuth';
import { useRouter } from 'next/navigation';
import { ErrorMessage, ROUTES } from '@/shared/utils';
import { useAppToast } from '@/shared/hooks';
import { PasswordInput } from '@/shared/components/ui';

type LoginFormValues = {
  username: string;
  password: string;
};

export const LoginForm = () => {
  const { login } = useAuth();
  const router = useRouter();
  const { showToast } = useAppToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values.username, values.password); // actually sending password on payload is not secure but backend doesn't support other way. like SRP, salt etc.

      router.push(ROUTES.FORM);
    } catch (err) {
      const error = err as ErrorMessage;

      showToast({
        title: error.title,
        description: error.message,
        status: 'error',
      });
    }
  };

  return (
    <Box maxW='400px' mx='auto' mt='100px'>
      <Heading mb={6}>Login</Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.username}>
            <FormLabel>User name</FormLabel>
            <Input
              {...register('username')}
              autoComplete='username'
              placeholder='Enter user name'
            />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <PasswordInput
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  autoComplete='current-password'
                  placeholder='Enter password'
                />
              )}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <Button type='submit' colorScheme='blue' isLoading={isSubmitting} w='full'>
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
