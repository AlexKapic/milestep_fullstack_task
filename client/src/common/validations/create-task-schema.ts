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
      .string()
      .test(
        '',
        'must be beetwen 0 and 100 ',
        (value) =>
          (value as unknown as number) > 0 &&
          (value as unknown as number) <= 100,
      )
      .required('this field is required'),
    dueDate: yup
      .string()
      .test(
        '',
        "must be valid today's afterdate",
        (value) => Date.parse(value as string) > Date.now(),
      )
      .required('this field is required'),
  });
