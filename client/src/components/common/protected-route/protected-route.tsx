import { Navigate, Outlet } from 'react-router-dom';
import { AppRoute, LocalStorageVariable } from '../../../common/enums';
import { useLocation, useEffect, useNavigate } from 'hooks/hooks';

export const ProtectedRoute = (): JSX.Element => {
  const token = localStorage.getItem(LocalStorageVariable.ACCESS_TOKEN);
  const { pathname } = useLocation();
  const isAuth = ([AppRoute.SIGN_IN, AppRoute.SIGN_UP] as string[]).includes(
    pathname,
  );
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (token && isAuth) {
      navigate(AppRoute.ROOT);
    }
  }, []);

  return token ? (
    <Outlet />
  ) : (
    <Navigate
      to={{
        pathname: AppRoute.SIGN_IN,
      }}
      state={{
        requestedPage: location.pathname,
      }}
    />
  );
};
