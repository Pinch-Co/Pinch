import * as React from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div className="sign-up-container">
      <div className="sign-up-logo-container">
        <img src="https://i.imgur.com/MI5gkUq.png" alt="smallLogo" className="logo-smoll" />
        <div className="free-secure-reliable">
          <p className="tid-bit">Free</p>
          <p className="tid-bit">Secure</p>
          <p className="tid-bit">Reliable</p>
        </div>
        <div className="paragraph-container">
          <p className="paragraph-size">
            Start reaching your
            financial goals with powerful tools,personalized
            analytics, and more. Fincancial freedom has never been so easy to do!
          </p>
          <div className="sign-up-section">
            <div className="make-the-button-center">
              <div className="button-sign-up">
                <Link to="/signup" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Sign up for Pinch!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
