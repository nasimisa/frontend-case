import { InferType } from 'yup';
import { formSchema } from './schema';

export type FormValues = InferType<typeof formSchema>;

export type ContactMethod = 'email' | 'phone' | 'both';

export interface FormPayload {
  full_name: string;
  email: string;
  password: string;
  phone?: string | null;
  age?: number | null;
  website?: string | null;
  bio?: string | null;
  country?: string | null;
  agree_terms: boolean;
  contact_method: ContactMethod;
}
