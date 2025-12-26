import * as yup from 'yup';
import { ContactMethod } from './types';

export const formSchema = yup.object({
  full_name: yup
    .string()
    .trim()
    .required('Full name is required')
    .matches(/^[A-Za-z\s]+$/, 'Only letters are allowed')
    .min(3, 'Minimum 3 characters')
    .max(100, 'Maximum 100 characters'),

  email: yup.string().required('Email is required').email('Invalid email'),

  password: yup
    .string()
    .trim()
    .required('Password is required')
    .min(8)
    .matches(/[a-z]/, 'Must contain lowercase letter')
    .matches(/[A-Z]/, 'Must contain uppercase letter')
    .matches(/\d/, 'Must contain a digit'),

  contact_method: yup.mixed<ContactMethod>().oneOf(['email', 'phone', 'both']).required(),

  phone: yup.string().when('contact_method', {
    is: (val: ContactMethod) => val === 'phone' || val === 'both',
    then: schema =>
      schema.required('Phone is required').matches(/^\+?[0-9]\d{7,14}$/, 'Invalid phone number'),
    otherwise: schema => schema.notRequired(),
  }),

  age: yup
    .number()
    .transform((value, originalValue) =>
      // to prevent Yup from converting empty string to NaN and showing Yup message
      originalValue === '' || Number.isNaN(value) ? undefined : value
    )
    .typeError('Age must be a valid number')
    .min(1, 'Age must be at least 1')
    .max(150, 'Age must be at most 150'),

  website: yup.string().trim().url('Invalid URL'),

  bio: yup.string().trim().max(500, 'Maximum 500 characters'),

  country: yup
    .string()
    .trim()
    .matches(/^[A-Za-z\s]+$/, {
      message: 'Country must contain only letters',
      excludeEmptyString: true,
    }),

  agree_terms: yup.boolean().required().oneOf([true], 'You must agree to terms'),
});
