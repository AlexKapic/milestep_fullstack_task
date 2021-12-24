import { AppRoute, HttpErrorMessage } from 'common/enums';
import { Sign, FormField, FormPasswordField } from 'components/common';
import {
  useAppDispatch,
  useForm,
  yupResolver,
  useNavigate,
  useState,
} from 'hooks/hooks';
import { authActions } from 'store/auth';
import { signUpSchema } from 'common/validations';
import { HttpError } from 'exceptions';
import commonStyles from '../common/styles.module.scss';
import { ISignUp } from 'common/interfaces/auth';

export const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({ resolver: yupResolver(signUpSchema) });

  const handleSubmitForm = async (data: ISignUp): Promise<void> => {
    try {
      await dispatch(authActions.signUp(data)).unwrap();
      navigate(AppRoute.ROOT);
    } catch (err) {
      const error = err as HttpError;
      if (
        error.message === HttpErrorMessage.EMAIL_ALREADY_EXISTS ||
        error.message === HttpErrorMessage.USERNAME_ALREADY_EXISTS
      ) {
        setGeneralError(error.message);
      }
    }
  };

  return (
    <Sign
      generalError={generalError}
      header="Get Started"
      secondaryText="Start work with Task Management System"
      submitText="Sign up"
      onSubmit={handleSubmit(handleSubmitForm)}
      submitClassName={commonStyles.submitButton}
      altRoute={{
        question: 'Already have an account?',
        linkText: 'Sign in',
        route: AppRoute.SIGN_IN,
      }}
    >
      <FormField
        label="Username"
        type="text"
        placeholder="Enter your name"
        controlId="signUpUsername"
        register={register('username')}
        errors={errors.username}
        inputClassName={commonStyles.input}
      />
      <FormField
        label="Email"
        type="email"
        placeholder="Enter your email"
        controlId="signUpEmail"
        register={register('email')}
        errors={errors.email}
        inputClassName={commonStyles.input}
      />
      <FormPasswordField
        label="Password"
        placeholder="Enter password"
        controlId="signUpPassword"
        register={register('password')}
        errors={errors.password}
        inputClassName={commonStyles.input}
      />
    </Sign>
  );
};
