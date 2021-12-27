import { ITaskCreate } from 'common/interfaces/task';
import { FormField } from 'components/common';
import { Button, Form } from 'react-bootstrap';
import { useAppDispatch, useForm, useState, yupResolver } from 'hooks/hooks';
import { createTaskSchema } from 'common/validations';
import commonStyles from '../../common/styles.module.scss';
import styles from './styles.module.scss';
import { taskActions } from 'store/tasks/actions';
import { HttpError } from 'exceptions';
import { HttpErrorMessage } from 'common/enums';

type Props = {
  action: { create: boolean; edit: boolean };
  taskId?: string;
  submitClassName?: string;
  editValues?: ITaskCreate;
};

export const TaskForm: React.FC<Props> = ({
  action,
  submitClassName,
  taskId,
  editValues,
}) => {
  const dispatch = useAppDispatch();
  const [generalError, setGeneralError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITaskCreate>({
    defaultValues: editValues,
    resolver: yupResolver(createTaskSchema),
  });

  const handleSubmitForm = async (data: ITaskCreate): Promise<void> => {
    try {
      action.create
        ? await dispatch(taskActions.createTask(data)).unwrap()
        : await dispatch(
            taskActions.editTask({ payload: data, id: taskId as string }),
          ).unwrap();
    } catch (err) {
      const error = err as HttpError;
      if (error.message === HttpErrorMessage.INVALID_LOGIN_DATA) {
        setGeneralError(error.message);
      }
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(handleSubmitForm)}
      className={`text-start text-secondary bg-white rounded p-5 ${styles.formContainer}`}
    >
      {generalError && (
        <div
          className={`alert alert-danger ${styles.errorMessage}`}
          role="alert"
        >
          {generalError}
        </div>
      )}
      <FormField
        label="Title"
        type="input"
        placeholder="Enter task title"
        controlId="title"
        register={register('title')}
        errors={errors.title}
        inputClassName={commonStyles.input}
      />
      <FormField
        label="Description"
        type="textarea"
        placeholder="Enter task description"
        controlId="description"
        register={register('description')}
        errors={errors.description}
        inputClassName={commonStyles.input}
      />
      <FormField
        label="Priority"
        type="number"
        placeholder="Enter task priority"
        controlId="priority"
        register={register('priority')}
        errors={errors.priority}
        inputClassName={commonStyles.input}
      />
      <FormField
        label="Due date"
        type="date"
        placeholder="Enter due date for task"
        controlId="dueDate"
        register={register('dueDate')}
        errors={errors.dueDate}
        inputClassName={commonStyles.input}
      />
      <div className="text-center">
        <Button
          variant="success"
          type="submit"
          size="lg"
          className={`my-3 ${submitClassName}`}
        >
          {action.create ? 'Create' : 'Apply edit'}
        </Button>
      </div>
    </Form>
  );
};
