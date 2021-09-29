// import * as React from 'react';
import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
// import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from '@apollo/client';
// import auth from '../../auth/auth';

interface OverviewProps extends RouteComponentProps<{ name: string }> {

}

function Login(props: OverviewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const client = new ApolloClient({
  //   uri: 'http://localhost:4000/graphql',
  // });

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailInput: string = event.target.value;
    setEmail(emailInput);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwrd: string = event.target.value;
    setEmail(passwrd);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

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
