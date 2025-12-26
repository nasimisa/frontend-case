'use client';

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from '../schema';
import { FormValues } from '../types';
import { submitForm } from '../api';
import { useAppToast } from '@/shared/hooks/useAppToast';
import { getApiErrorMessage } from '@/shared/utils/error';
import { PasswordInput } from '@/shared/components/PasswordInput';

export const UserForm = () => {
  const { showToast } = useAppToast();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      full_name: '',
      email: '',
      password: '',
      phone: undefined,
      age: undefined,
      website: undefined,
      bio: undefined,
      country: undefined,
      contact_method: 'email',
      agree_terms: false,
    },
  });

  const contactMethod = watch('contact_method');

  const onSubmit = async (values: FormValues) => {
    try {
      await submitForm(values);
      showToast({
        title: 'Success',
        description: 'Form submitted successfully',
        status: 'success',
      });
      reset();
    } catch (err) {
      const apiError = getApiErrorMessage(err);
      showToast({
        title: apiError.title,
        description: apiError.message,
        status: 'error',
      });
    }
  };

  return (
    <Box maxW='600px' mx='auto' py={8} px={3}>
      <Heading mb={6}>User form</Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.full_name}>
            <FormLabel>Full Name</FormLabel>
            <Input type='text' {...register('full_name')} placeholder='e.g. John Doe' />
            <FormErrorMessage>{errors.full_name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input type='email' {...register('email')} placeholder='e.g. john.doe@gmail.com' />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
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
                  placeholder='Enter password'
                />
              )}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Contact Method</FormLabel>
            <Select {...register('contact_method')}>
              <option value='email'>Email</option>
              <option value='phone'>Phone</option>
              <option value='both'>Both</option>
            </Select>
          </FormControl>

          {(contactMethod === 'phone' || contactMethod === 'both') && (
            <FormControl isInvalid={!!errors.phone}>
              <FormLabel>Phone</FormLabel>
              <Input type='tel' {...register('phone')} placeholder='e.g. +994504646613' />
              <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
            </FormControl>
          )}

          <FormControl isInvalid={!!errors.age}>
            <FormLabel>Age</FormLabel>
            <Input type='number' {...register('age')} placeholder='Enter age' />
            <FormErrorMessage>{errors.age?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.website}>
            <FormLabel>Website</FormLabel>
            <Input type='url' {...register('website')} placeholder='e.g. https://www.google.com/' />
            <FormErrorMessage>{errors.website?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.bio}>
            <FormLabel>Bio</FormLabel>
            <Textarea {...register('bio')} placeholder='Enter bio' />
            <FormErrorMessage>{errors.bio?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.country}>
            <FormLabel>Country</FormLabel>
            <Input type='text' {...register('country')} placeholder='Enter country' />
            <FormErrorMessage>{errors.country?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.agree_terms}>
            <Checkbox {...register('agree_terms')}>I agree to the terms</Checkbox>
            <FormErrorMessage>{errors.agree_terms?.message}</FormErrorMessage>
          </FormControl>

          <Button type='submit' colorScheme='blue' isLoading={isSubmitting} w='full'>
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
