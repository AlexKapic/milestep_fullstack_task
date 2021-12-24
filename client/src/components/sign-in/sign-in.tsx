import { AppRoute, HttpErrorMessage } from 'common/enums';
import { ISignIn } from 'common/interfaces/auth';
import { signInSchema } from 'common/validations';
import { HttpError } from 'exceptions';
import {
  useAppDispatch,
  useForm,
  useLocation,
  useNavigate,
  useState,
  yupResolver,
} from 'hooks/hooks';
import { authActions } from 'store/auth';
import commonStyles from '../common/styles.module.scss';
import { Sign, FormField, FormPasswordField } from 'components/common';

export const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({ resolver: yupResolver(signInSchema) });

  const { state } = useLocation();

  const handleSubmitForm = async (data: ISignIn): Promise<void> => {
    try {
      await dispatch(authActions.signIn(data)).unwrap();
      if (state) {
        navigate({ pathname: AppRoute.TASKS }, { state });
      } else {
        navigate({ pathname: AppRoute.TASKS });
      }
    } catch (err) {
      const error = err as HttpError;
      if (error.message === HttpErrorMessage.INVALID_LOGIN_DATA) {
        setGeneralError(error.message);
      }
    }
  };

  return (
    <Sign
      generalError={generalError}
      header="Welcome back"
      secondaryText="Sign in to your account to continue"
      submitText="Sign in"
      onSubmit={handleSubmit(handleSubmitForm)}
      submitClassName={commonStyles.submitButton}
      altRoute={{
        // prettier-ignore
        question: 'Don\'t have an account?',
        linkText: 'Sign up',
        route: AppRoute.SIGN_UP,
      }}
    >
      <FormField
        label="Email"
        type="email"
        placeholder="Enter your email"
        controlId="signInEmail"
        register={register('email')}
        errors={errors.email}
        inputClassName={commonStyles.input}
      />
      <FormPasswordField
        register={register('password')}
        label="Password"
        placeholder="Enter your password"
        errors={errors.password}
        inputClassName={commonStyles.input}
      />
    </Sign>
  );
};
