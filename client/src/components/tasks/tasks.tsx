import { AppRoute, LocalStorageVariable } from 'common/enums';
import { Header } from 'components/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useNavigate,
} from 'hooks/hooks';
import { authActions } from 'store/auth';
import { TaskContainer } from './tasks-container';

export const Tasks: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = localStorage.getItem(LocalStorageVariable.ACCESS_TOKEN);
  const { user } = useAppSelector((state) => state.auth);

  const signOut = async (): Promise<void> => {
    dispatch(authActions.signOut())
      .unwrap()
      .then(() => {
        navigate(AppRoute.SIGN_IN);
      });
  };

  useEffect(() => {
    if (token && !user) {
      dispatch(authActions.loadUser());
    }
  }, []);
  return (
    <>
      <Header name={user?.username} signOut={signOut} />
      <TaskContainer tasks={user?.tasks} />
    </>
  );
};
