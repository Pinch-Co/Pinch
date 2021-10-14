export default function validateInfo(values: any) {
  const errors: any = {};

  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.phone) {
    errors.phone = 'Phone number required';
  } else if (values.phone.length < 6) {
    errors.phone = 'Invalid phone numbers, please enter valid numbers';
  }

  if (values.password.length === 0) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password needs to be more than 6 characters';
  }

  return errors;
}
