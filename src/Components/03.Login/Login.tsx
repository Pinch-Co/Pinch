import React, { useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import axios from 'axios';
import validateLogin from '../SharedComponents/05.Validation/loginCheck';

interface OverviewProps extends RouteComponentProps<{ name: string }> { }

interface Verrors {
  email: string;
  password: string;
}

// eslint-disable-next-line no-unused-vars
function Login(props: OverviewProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validation, setErrors] = useState<Verrors>();
  // eslint-disable-next-line no-unused-vars
  const [err, setErr] = useState([]);

  const allValues: any = {
    // eslint-disable-next-line quote-props
    'email': email,
    // eslint-disable-next-line quote-props
    'password': password,
  };

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

    const returnedValidation = validateLogin(allValues);
    setErrors(returnedValidation);

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
      <div className="empty-div" />
      <div className="login-center-div">
        <div className="login-main-div">
          <div className="login-page-logo-div">
            <img className="pinch-logo" src="https://i.imgur.com/MZQaH4n.png" alt="pinch logo" />
          </div>
          <div className="credentials-div">
            <div className="credentials-title">Login</div>
            <form className="login-form">
              <div className="login-input-title">Email Address</div>
              <div className="input-container" data-error={validation?.email}>
                <input
                  className="login-input"
                  type="text"
                  placeholder="example@email.com"
                  onChange={(event) => handleEmail(event)}
                />
              </div>
              <div className="login-input-title">Password</div>
              <div className="input-container" data-error={validation?.password}>
                <input
                  className="login-input"
                  type="password"
                  placeholder="•••••••••••••"
                  onChange={(event) => handlePassword(event)}
                />
              </div>
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
              <div>
                Don’t have an account?
                <u className="signup-link">
                  <Link to="/signup" style={{ color: 'inherit' }}>
                    Sign Up
                  </Link>
                </u>
              </div>
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
