// import * as React from 'react';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
// import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from '@apollo/client';

interface OverviewProps extends RouteComponentProps<{ name: string }> { }

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
    axios.post(
      'http://localhost:4000/graphql',
      JSON.stringify({
        query: `mutation {login(email: "${email}", password: "${password}") {
          user {
            id
            firstName
            lastName
            email
          }
        }
      }`,
      }), { headers },
    )
      .then((response) => {
        const error = response.data.errors;
        setErr(error);
      })
      .catch(() => { });
  };

  return (
    <div className="login-container">
      <div />
      <div className="login-center-div">
        <div className="login-main-div">
          <div className="login-page-logo-div">
            <img className="pinch-logo" src="https://i.imgur.com/MZQaH4n.png" alt="pinch logo" />
          </div>
          <div className="credentials-div">
            <div className="credentials-title">Login</div>
            <form className="login-form">
              <div className="login-input-title">Email Address</div>
              <input
                className="login-input"
                type="text"
                placeholder="example@email.com"
                onChange={(event) => handleEmail(event)}
              />
              <div className="login-input-title">Password</div>
              <input
                className="login-input"
                type="password"
                placeholder="•••••••••••••"
                onChange={(event) => handlePassword(event)}
              />
              <div className="remember-me">
                <label htmlFor="remember-me" className="remember-me-label">
                  <input className="remember-me-chk" type="checkbox" id="remember-me" />
                  <div className="remember-me-text">Remember Me</div>
                </label>
              </div>
            </form>
            <button className="sign-in-btn" type="submit" onClick={(event) => handleSubmit(event)}>
              Sign In
            </button>
            <div className="agreement">
              By selecting Sign In, you agree to our Terms and have read and acknowledge
              our Global Privacy Statement.
            </div>
            <div className="no-account">
              <div>Don’t have an account?</div>
              <div>Sign Up</div>
            </div>
          </div>
        </div>
      </div>
      <div className="rights-text-div">
        <div className="rights-text">
          All rights reserved. Pinch, Pinch Co and Pinch LLC are registered trademarks of
          Pinch Inc.
        </div>
        <div className="rights-text">
          Terms and conditions, features, support, pricing, and
          service options subject to change without notice.
        </div>
      </div>
    </div>
  );
}

export default Login;
