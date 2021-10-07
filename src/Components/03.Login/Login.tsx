// import * as React from 'react';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
// import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from '@apollo/client';
// import auth from '../../auth/auth';

interface OverviewProps extends RouteComponentProps<{ name: string }> {

}

// eslint-disable-next-line no-unused-vars
function Login(props: OverviewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [err, setErr] = useState([]);

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
    const headers = { 'Content-Type': 'application/json' };

    axios.post('http://localhost:4000/graphql', JSON.stringify({
      query: `mutation {
      login(email: "${email}", password: "${password}") {
        user {
          id
          firstName
          lastName
          email
        }
      }
    }`,
    }), { headers })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log('response', response);
        const error = response.data.errors;
        setErr(error);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
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

export default Login;
