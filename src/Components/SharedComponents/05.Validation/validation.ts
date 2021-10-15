export default function validateInfo(values: any) {
  const errors: any = {};
<<<<<<< HEAD
  const emailRegex = /\S+@\S+\.\S+/;
  // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

  // -- Email Validaiton ---//
  if (!values.email) {
    errors.email = 'Email required';
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  // --Phone Validaiton ---//
=======

  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

>>>>>>> cebb91c9b8fc581a9e9c2f2b99f5517b94722e6b
  if (!values.phone) {
    errors.phone = 'Phone number required';
  } else if (values.phone.length < 6) {
    errors.phone = 'Invalid phone numbers, please enter valid numbers';
  }
<<<<<<< HEAD
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
=======

  if (values.password.length === 0) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password needs to be more than 6 characters';
  }
>>>>>>> cebb91c9b8fc581a9e9c2f2b99f5517b94722e6b

  return errors;
}
