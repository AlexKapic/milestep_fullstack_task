import * as yup from 'yup';
import { passwordRegex } from './regex/regex';

export const signUpSchema = yup
  .object()
  .strict(true)
  .required()
  .noUnknown(true)
  .shape({
    username: yup
      .string()
      .typeError('you must specify a string')
      .trim()
      .min(3, 'username must consist at least 3 characters')
      .max(50, 'username must consist max 50 characters')
      .required('this field is required'),
    email: yup
      .string()
      .typeError('you must specify a string')
      .email('must be a valid email')
      .required('this field is required'),
    password: yup
      .string()
      .min(6, 'password must consist at least 6 characters')
      .max(12, 'password must consist max 12 characters')
      .matches(
        passwordRegex,
        'password must consist of latin letters (upper and lower case), numbers, and symbols',
      )
      .required('this field is required'),
  });
