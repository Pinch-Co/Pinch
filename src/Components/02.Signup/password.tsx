import React from 'react';
import zxcvbn from 'zxcvbn';

interface PasswordProps {
  passwort: string;
}

function PasswordChecker(props: PasswordProps) {
  const { passwort } = props;
  const scanPassword = zxcvbn(passwort);
  const num = scanPassword.score * (100 / 4);

  // ---------------section for password checking bullet points --------//
  const charLengthStyles: { [key: string]: React.CSSProperties } = {
    container: {
      color: '#5d5d5d',
    },
  };

  const digitStyles: { [key: string]: React.CSSProperties } = {
    container: {
      color: '#5d5d5d',
    },
  };

  const lowerCaseStyles: { [key: string]: React.CSSProperties } = {
    container: {
      color: '#5d5d5d',
    },
  };

  const specialCharStyles: { [key: string]: React.CSSProperties } = {
    container: {
      color: '#5d5d5d',
    },
  };
  // console.log('password', passwort);
  if (passwort.length >= 8) {
    charLengthStyles.container.color = '#20b2aa';
  }
  if (passwort.search(/[0-9]/) !== -1) {
    digitStyles.container.color = '#20b2aa';
  }
  if (passwort.search(/[a-zA-Z]/) !== -1) {
    lowerCaseStyles.container.color = '#20b2aa';
  }
  if (passwort.search(/[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/) !== -1) {
    specialCharStyles.container.color = '#20b2aa';
  }
  // --------------- END: section for password checking bullet points --------//

  // ---------------section for password strength bar --------//
  const createPassLabel = () => {
    switch (scanPassword.score) {
      case 0:
        return 'Very weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fear';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return '';
    }
  };

  const funcProgressColor = () => {
    switch (scanPassword.score) {
      case 0:
        return '#828282';
      case 1:
        return '#EA1111';
      case 2:
        return '#FFAD00';
      case 3:
        return '#9bc158';
      case 4:
        return '#00b500';
      default:
        return 'none';
    }
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      width: `${num}%`,
      height: '10px',
      background: funcProgressColor(),
      borderRadius: '6px',
    },
  };
  // ---------------END : section for password strength bar --------//
  return (
    <div className="password-modal-container">
      <div className="password-modal-contents">
        <p className="most-contain">Must Contain</p>
        <hr className="line" />
        <li className="constraints" style={charLengthStyles.container}>At least 8 characters</li>
        <li className="constraints" style={specialCharStyles.container}>At least 1 special character</li>
        <li className="constraints" style={digitStyles.container}>At least 1 digit</li>
        <li className="constraints" style={lowerCaseStyles.container}>At least 1 letter</li>
        <div className="progress">
          <div className="progress-bar" style={styles.container} />
        </div>
        <div className="password-strength-container">
          <p className="password-strength-label">Password strength :</p>
          <p className="password-strength">
            {createPassLabel()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PasswordChecker;

// {/* <li className="constraints" style={upperCaseStyles.container}>
// atleast 1 uppercase character</li> */}
