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

export const Tasks: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = localStorage.getItem(LocalStorageVariable.ACCESS_TOKEN);
  const { user } = useAppSelector((state) => state.auth);
  const [isModalShown, setIsModalShown] = useState(false);
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
    setIsModalShown(true);
    setAction({ edit: false, create: true });
  };

  const editHandler = (id: string): void => {
    setEditedTaskId(id);
    dispatch(taskActions.getTask(id))
      .unwrap()
      .then((task) => {
        setEditedTaskValues(mapTaskToEditableTask(task) as ITask);
        setAction({ edit: true, create: false });
        setIsModalShown(true);
      });
  };

  const onHideModal = (): void => {
    setIsModalShown(false);
    setAction({ edit: false, create: false });
    setEditedTaskValues(undefined);
  };

  useEffect(() => {
    if (token && !user) {
      dispatch(authActions.loadUser());
    }
  }, []);
  return (
    <>
      <Header name={user?.username} signOut={signOut} />
      <TaskManagament addHandler={addHandler} />
      <TaskContainer tasks={user?.tasks} editHandler={editHandler} />
      <Modal
        show={isModalShown}
        onHide={onHideModal}
        title={action.create ? 'Create new task' : 'Edit current task'}
        size="lg"
      >
        <TaskForm
          action={action}
          editValues={editedTaskValues}
          submitClassName={commonStyles.submitButton}
          taskId={editedTaskId}
        />
      </Modal>
    </>
  );
};
