/* eslint-disable quote-props */ // need quotes for the DB
import React, { useState } from 'react';
import { RouteComponentProps, Link, useHistory } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import validateInfo from '../SharedComponents/05.Validation/validation';
import PasswordChecker from './password';

interface OverviewProps extends RouteComponentProps<{ name: string }> { }

interface Verrors {
  email: string;
  password: string;
  phone: string;
}

// eslint-disable-next-line no-unused-vars
function SignUp(props: OverviewProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string | undefined>();
  const [validation, setErrors] = useState<Verrors | undefined>();
  const history = useHistory();

  const allValues: any = {
    'email': email,
    'phone': phone,
    'password': password,
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailInput = event.target.value;
    setEmail(emailInput);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwrd = event.target.value;
    setPassword(passwrd);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const result = validateInfo(allValues);
    if (Object.keys(result).length === 0) {
      history.push({
        pathname: '/additional-info',
        state: allValues,
      });
    } else {
      setErrors(result);
    }
  };

  return (
    <div className="signUp-container">
      <div className="signUp-empty-div" />
      <div className="signUp-center-div">
        <div className="signUp-main-div">
          <div className="signUp-page-logo-div">
            <img className="pinch-logo" src="https://i.imgur.com/MZQaH4n.png" alt="pinch logo" />
          </div>
          <div className="signup-credentials-div">
            <div className="signup-title">Create a Pinch Account</div>
            <form className="signUp-form">
              <div className="signUp-input-title">Email Address</div>
              <div className="input-container" data-error={validation?.email}>
                <input
                  className="signUp-input"
                  type="text"
                  placeholder="example@email.com"
                  onChange={(event) => handleEmail(event)}
                />
              </div>
              <div className="signUp-input-title">Phone</div>
              <div className="input-container" data-error={validation?.phone}>
                <PhoneInput
                  country="us"
                  placeholder="555-555-5555"
                  value={phone}
                  onChange={(value: string) => setPhone(value)}
                />
              </div>
              {password ? <PasswordChecker passwort={password} /> : null}
              <div className="signUp-input-title">Password</div>
              <div className="input-container" data-error={validation?.password}>
                <input
                  className="signUp-input"
                  type="password"
                  placeholder="•••••••••••••"
                  onChange={(event) => handlePassword(event)}
                />
              </div>
            </form>
            <button className="signin-signup-btn" type="submit" onClick={(event) => handleSubmit(event)}>
              Create Account
            </button>
            <div className="have-account">
              <div>
                Already have an account?
                <u className="login-link">
                  <Link to="/login" style={{ color: 'inherit' }}>
                    Sign In
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

export default SignUp;
