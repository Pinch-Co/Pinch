/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-redeclare */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../06.Context/AppContext';

interface AuthProp {
  auth: boolean;
}

function Header(auth: AuthProp) {
  const {
    setAuth,
    setNav,
  } = useContext(AppContext);

  const handleClick = () => {
    setAuth(false);
    setNav(false);
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
        {auth.auth ? <Link id="link" to="/login" className="link" onClick={() => handleClick()}>Logout</Link> : <Link id="link" to="/login" className="link">Login</Link>}
      </div>
    </div>
  );
}

export default Header;
