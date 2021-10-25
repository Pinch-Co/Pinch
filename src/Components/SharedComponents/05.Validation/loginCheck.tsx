/* eslint-disable no-console */
/* eslint-disable no-lonely-if */
export default function validateLogin(values: any) {
  const errors: any = {};

  // replace this with DB call of all users with email and password info
  const tempUserList = [
    {
      id: '1',
      firstName: 'Maurice',
      lastName: 'Moss',
      phone: '',
      email: 'm@moss.com',
      password: 'abcdefg',
    },
    {
      id: '2',
      firstName: 'Roy',
      lastName: 'Trenneman',
      phone: '',
      email: 'roy@trenneman.com',
      password: 'iamroy',
    },
    {
      id: '3',
      firstName: 'Sugma',
      lastName: 'Trenneman',
      phone: '',
      email: 'sugma@gmail.com',
      password: 'ligmaBalls',
    },
    {
      id: '4',
      firstName: 'Naruto',
      lastName: 'Uzumaki',
      phone: '',
      email: 'seventhHokage@gmail.com',
      password: 'heySakura',
    },
  ];

  // check if email exists in database
  if (!values.email) {
    errors.email = 'Email required';
  } else {
    // check if password matches with the email provided
    if (values.password.length === 0) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password is incorrect';
    } else {
      let passwordMatch = false;
      for (let i = 0; i < tempUserList.length; i += 1) {
        const currentUser = tempUserList[i];
        if (currentUser.email === values.email && currentUser.password === values.password) {
          passwordMatch = true;
          break;
        }
      }
      // temporary success message
      if (passwordMatch) {
        // eslint-disable-next-line no-alert
        console.log('Login successful!');
      } else {
        errors.password = 'Email and/or password is incorrect.';
      }
    }
  }

  if (values.password.length === 0) {
    errors.password = 'Password is required';
  }

  return errors;
}
