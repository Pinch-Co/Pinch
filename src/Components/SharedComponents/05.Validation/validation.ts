export default function validateInfo(values: any) {
  const errors: any = {};
  const emailRegex = /\S+@\S+\.\S+/;
  // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

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
  // if (values.password.search(/[0-9]/) < 0) {
  //   errors.password = 'Your password must contain at least one digit.';
  // }
  // if (values.password.search(/[a-z]/i) < 0) {
  //   errors.password = 'Your password must contain at least one lowercase letter.';
  // }
  // if (values.password.length < 8) {
  //   errors.password = 'Your password must be at least 8 characters';
  // }
  // if (values.password.search(/[A-Z]/i) < 0) {
  //   errors.password = 'Your password must contain at least one uppercase letter.';
  // }

  return errors;
}
