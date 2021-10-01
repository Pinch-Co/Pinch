// import * as React from 'react';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
// import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from '@apollo/client';
// import auth from '../../auth/auth';

interface OverviewProps extends RouteComponentProps<{ name: string }> {

}

// eslint-disable-next-line no-unused-vars
function Login(props: OverviewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const client = new ApolloClient({
  //   uri: 'http://localhost:4000/graphql',
  // });

  const loginQuery = `
  mutation {
    login(email: ${email}, password: ${password}) {
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
  `;

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailInput: string = event.target.value;
    setEmail(emailInput);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwrd: string = event.target.value;
    setPassword(passwrd);
  };

  // eslint-disable-next-line no-unused-vars
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // console.log(loginQuery);
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: loginQuery }),
    }).then((res) => res.json())
    // eslint-disable-next-line no-console
      .then((data) => console.log('this is data', data));
  };

  return (
    <div>
      Please Log in
      <form>
        <input type="text" placeholder="Email" onChange={(event) => handleEmail(event)} />
        <input type="text" placeholder="Password" onChange={(event) => handlePassword(event)} />
      </form>
      <button type="submit" onClick={(event) => handleSubmit(event)}>
        Login
      </button>
    </div>
  );
}

// const login = () => {
//   auth.login(() => {
//     props.history.go(-1);
//   });
// };

export default Login;
