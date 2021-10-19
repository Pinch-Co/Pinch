import * as React from 'react';

function SignUp() {
  return (
    <div className="sign-up">
      <div className="container-logo-words">
        <img src="https://i.imgur.com/MI5gkUq.png" alt="smallLogo" className="logo-smoll" />
        <div className="column-words">
          <div className="underline">Free</div>
          <div className="underline">Secure</div>
          <div>Reliable</div>
        </div>
      </div>
      <div className="column-description">
        <div className="make-the-button-center">
          <div className="button-sign-up">Sign up for Pinch!</div>
        </div>
        <p className="pargaph-size">Start reaching your financial goals with powerful tools,</p>
        <p className="pargaph-size">personalized analytics, and more. Fincancial freedom has</p>
        <p className="pargaph-size">never been so easy to do!</p>
      </div>
    </div>
  );
}

export default SignUp;
