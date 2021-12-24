import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { AppRoute } from 'common/enums';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

type AlternativeRoute = {
  question: string;
  linkText: string;
  route: AppRoute;
};

type Props = {
  header: string;
  secondaryText: string;
  submitText: string;
  children: JSX.Element | JSX.Element[];
  onSubmit: (e: React.SyntheticEvent) => void;
  isSubmitDisabled?: boolean;
  submitClassName?: string;
  altRoute?: AlternativeRoute;
  generalError?: string;
};

export const Sign: React.FC<Props> = ({
  header,
  secondaryText,
  submitText,
  children,
  onSubmit,
  isSubmitDisabled,
  altRoute,
  generalError,
  submitClassName,
}) => {
  return (
    <div className="vh-100 vw-100 d-flex flex-column justify-content-center align-items-center bg-light text-center">
      <div className={styles.container}>
        <h2 className={`${styles.header} h4`}>{header}</h2>
        <p className="text-secondary">{secondaryText}</p>
        <Form
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
          {children}
          <div className="text-center">
            <Button
              variant="success"
              type="submit"
              size="lg"
              onClick={onSubmit}
              disabled={isSubmitDisabled}
              className={`my-3 ${submitClassName}`}
            >
              {submitText}
            </Button>
            {altRoute && (
              <div className="text-secondary mt-3">
                {altRoute.question}
                <Link className="text-decoration-none mx-2" to={altRoute.route}>
                  {altRoute.linkText}
                </Link>
              </div>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};
