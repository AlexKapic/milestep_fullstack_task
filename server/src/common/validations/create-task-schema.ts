import * as yup from 'yup';

export const createTaskSchema = yup
  .object()
  .strict(true)
  .required()
  .noUnknown(true)
  .shape({
    title: yup
      .string()
      .typeError('you must specify a string')
      .trim()
      .min(3, 'title must consist at least ${min} characters')
      .max(100, 'title must consist max 100 characters')
      .required('this field is required'),
    description: yup
      .string()
      .typeError('you must specify a string')
      .trim()
      .min(5, 'description must consist at least 5 characters')
      .required('this field is required'),
    priority: yup
      .number()
      .typeError('you must specify a number')
      .integer('number must be a integer')
      .positive('number must be a positive integer')
      .min(0)
      .max(100, 'number must be no more than 100')
      .required('this field is required'),
    dueDate: yup
      .date()
      .typeError('you must specify a date')
      .min(
        new Date(Date.now()),
        'date cannot be earlier than the current moment',
      )
      .required('this field is required'),
  });
