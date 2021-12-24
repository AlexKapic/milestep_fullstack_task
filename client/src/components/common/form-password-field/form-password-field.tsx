import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from './styles.module.scss';

type Props = {
  label: string;
  placeholder: string;
  name?: string;
  controlId?: string;
  register?: UseFormRegisterReturn;
  errors?: FieldError | undefined;
  value?: string;
  inputClassName?: string;
};

export const FormPasswordField: React.FC<Props> = ({
  label,
  placeholder,
  register,
  errors,
  controlId,
  value,
  inputClassName,
}) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const handleHidePassword = (): void => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label className={styles.label}>{label}</Form.Label>
      {value ? (
        <Form.Control readOnly placeholder={value} />
      ) : (
        <InputGroup>
          <Form.Control
            {...register}
            type={isPasswordHidden ? 'password' : 'text'}
            placeholder={placeholder}
            isInvalid={!!errors}
            className={inputClassName}
          />
          <InputGroup.Text
            className={styles.hidePassword}
            onClick={handleHidePassword}
          >
            <i
              className={isPasswordHidden ? 'bi bi-eye-slash' : 'bi bi-eye'}
            ></i>
          </InputGroup.Text>
          {errors && (
            <Form.Control.Feedback type="invalid">
              {errors?.message}
            </Form.Control.Feedback>
          )}
        </InputGroup>
      )}
    </Form.Group>
  );
};
