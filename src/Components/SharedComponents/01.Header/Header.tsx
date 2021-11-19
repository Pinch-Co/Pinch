/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-redeclare */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import auth from '../../../auth/auth';

function Header() {
  const history = useHistory();

  const handleClick = () => {
    auth.logout(() => {
      history.push('/login');
    });
  };

  return (
    <div className="header">
      <div className="header-image">
        <img src="https://i.imgur.com/MZQaH4n.png" alt="logo" className="header-logo" />
      </div>
      <div className="header-contents">
        <Link id="link" to="/home/settings" className="link">Profile</Link>
        <Link id="link" to="/alerts" className="link">Alerts</Link>
        <Link id="link" to="/home/settings" className="link">Settings</Link>
        {auth.isAuthenticated() ? <Link id="link" to="/login" className="link" onClick={() => handleClick()}>Logout</Link> : <Link id="link" to="/login" className="link">Login</Link>}
      </div>
    </div>
  );
}

export default Header;
