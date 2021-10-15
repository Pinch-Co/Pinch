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
  let emailExists = false;
  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  } else {
    for (let i = 0; i < tempUserList.length; i += 1) {
      if (tempUserList[i].email === values.email) {
        emailExists = true;
        break;
      }
    }
    if (!emailExists) {
      errors.email = 'Email does not exist. Sign up instead';
    } else {
      // check if password matches with the email provided
      if (values.password.length === 0) {
        errors.password = 'Password is required';
      } else if (values.password.length < 6) {
        errors.password = 'Password is incorrect';
      } else {
        let passwordMatch = false;
        for (let i = 0; i < tempUserList.length; i += 1) {
          if (tempUserList[i].password === values.password) {
            passwordMatch = true;
            break;
          }
        }
        if (passwordMatch) {
          // temporary success message
          // eslint-disable-next-line no-alert
          window.alert('Login successful!');
        } else {
          errors.password = 'Password is incorrect';
        }
      }
    }
  }

  return errors;
}
