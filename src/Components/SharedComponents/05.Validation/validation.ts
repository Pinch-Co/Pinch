export default function validateInfo(values: any) {
  const errors: any = {};

  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (values.password.length === 0) {
    errors.password = 'Password is required';
  }

  // if (!values.password) {
  //   errors.password = 'Password is required';
  // } else if (values.password !== values.password) {
  //   errors.password = 'Passwords do not match';
  // }

  return errors;
}
