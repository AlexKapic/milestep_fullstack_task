enum HttpErrorMessage {
  USERNAME_ALREADY_EXISTS = 'User with such username already exists',
  EMAIL_ALREADY_EXISTS = 'User with such email already exists',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  INVALID_TOKEN = 'Invalid token',
  UNAUTHORIZED = 'Unauthorized',
  INVALID_LOGIN_DATA = 'Incorrect email or password',
  INVALID_FILE_TYPE = 'Invalid file type',
}

export { HttpErrorMessage };
