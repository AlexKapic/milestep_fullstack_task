import { AppRoute } from 'common/enums';
import { LoadSpinner } from 'components/common';
import { useEffect, useLocation, useNavigate, useState } from 'hooks/hooks';
import { authApi } from 'services';
import useCountDown from 'react-countdown-hook';

export const ConfirmEmail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [timeLeft, { start }] = useCountDown(6000, 1000);

  const query = new URLSearchParams(location.search);
  const token = query.get('token') || '';

  if (!token) {
    navigate(AppRoute.ROOT);
  }

  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    authApi.confirmEmail({ token }).then(() => {
      setSpinner(false);
      start();
    });
  }, []);

  useEffect(() => {
    if (timeLeft === 1000) {
      navigate(AppRoute.ROOT);
    }
  }, [timeLeft]);

  return (
    <>
      {spinner && <LoadSpinner />}
      {!spinner && (
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <h3>You successfuly confirmed your email.</h3>
          <h5>Redirection to login page in {timeLeft / 1000 - 1} seconds</h5>
        </div>
      )}
    </>
  );
};
