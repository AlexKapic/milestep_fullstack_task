import { AppRoute, LocalStorageVariable } from 'common/enums';

import { Header } from 'components/common';
import { Modal } from 'components/common/modal';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useNavigate,
  useState,
} from 'hooks/hooks';
import { authActions } from 'store/auth';
import { TaskForm } from './task-form';
import { TaskContainer } from './tasks-container';
import commonStyles from '../common/styles.module.scss';
import { TaskManagament } from './task-management';
import { taskActions } from 'store/tasks';
import { ITask } from 'common/interfaces/task';
import { mapTaskToEditableTask } from '../../helpers';
import { TaskInfoCard } from './task-info-card';

export const Tasks: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = localStorage.getItem(LocalStorageVariable.ACCESS_TOKEN);
  const { user } = useAppSelector((state) => state.auth);
  const { currentTask } = useAppSelector((state) => state.task);
  const [isFormShown, setIsFormShown] = useState(false);
  const [isTaskShown, setIsTaskShown] = useState(false);
  const [action, setAction] = useState({ create: false, edit: false });
  const [editedTaskValues, setEditedTaskValues] = useState<ITask>();
  const [editedTaskId, setEditedTaskId] = useState<string>();

  const signOut = async (): Promise<void> => {
    dispatch(authActions.signOut())
      .unwrap()
      .then(() => {
        navigate(AppRoute.SIGN_IN);
      });
  };

  const addHandler = (): void => {
    setIsFormShown(true);
    setAction({ edit: false, create: true });
  };

  const editHandler = (id: string): void => {
    setEditedTaskId(id);
    dispatch(taskActions.getTask(id))
      .unwrap()
      .then((task) => {
        setEditedTaskValues(mapTaskToEditableTask(task) as ITask);
        setAction({ edit: true, create: false });
        setIsFormShown(true);
      });
  };

  const deleteHandler = (id: string): void => {
    dispatch(taskActions.deleteTask(id));
  };

  const onHideModal = (): void => {
    setIsFormShown(false);
    setIsTaskShown(false);
    setAction({ edit: false, create: false });
    setEditedTaskValues(undefined);
  };

  const showInfoCard = (id: string): void => {
    dispatch(taskActions.getTask(id))
      .unwrap()
      .then(() => {
        setIsTaskShown(true);
      });
  };

  const toggleDone = (arg: { isDone: boolean; id: string }): void => {
    dispatch(taskActions.doneTask(arg));
  };

  const toggleAllDone = (isDone: boolean): void => {
    dispatch(taskActions.doneTasks({ isDone }));
  };

  useEffect(() => {
    if (token && !user) {
      dispatch(authActions.loadUser());
    }
  }, []);
  return (
    <>
      <Header name={user?.username} signOut={signOut} />
      <TaskManagament addHandler={addHandler} toggleAllDone={toggleAllDone} />
      <TaskContainer
        tasks={user?.tasks}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
        showInfoCard={showInfoCard}
      />
      <Modal
        show={isFormShown || isTaskShown}
        onHide={onHideModal}
        title={
          action.create
            ? 'Create new task'
            : action.edit
            ? 'Edit current task'
            : 'Task'
        }
        size="lg"
      >
        {isFormShown ? (
          <TaskForm
            action={action}
            editValues={editedTaskValues}
            submitClassName={commonStyles.submitButton}
            taskId={editedTaskId}
          />
        ) : (
          <TaskInfoCard task={currentTask} toggleDone={toggleDone} />
        )}
      </Modal>
    </>
  );
};
