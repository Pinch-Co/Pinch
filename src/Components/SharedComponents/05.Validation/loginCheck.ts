/* eslint-disable no-console */
/* eslint-disable no-lonely-if */

export default function validateLogin(values: any) {
  const errors: any = {};
  const emailRegex = /\S+@\S+\.\S+/;

  // check email input criteria
  if (!values.email) {
    errors.email = 'Email required';
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  // Check password input criteria
  if (values.password.length === 0) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password is incorrect length';
  }

  return errors;
}
