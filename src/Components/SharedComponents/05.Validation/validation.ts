export default function validateInfo(values: any) {
  const errors: any = {};
  const emailRegex = /\S+@\S+\.\S+/;

  // -- Email Validaiton ---//
  if (!values.email) {
    errors.email = 'Email required';
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  // --Phone Validaiton ---//
  if (!values.phone) {
    errors.phone = 'Phone number required';
  } else if (values.phone.length < 6) {
    errors.phone = 'Invalid phone numbers, please enter valid numbers';
  }
  // -- Password Validaiton ---//
  if (values.password.length === 0) {
    errors.password = 'Password is required';
  }
  return errors;
}
