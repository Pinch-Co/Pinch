import * as React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <div className="header-logo">
        <img src="/public/assets/Images/logo.png" alt="logo"/>
      </div>
      <div className="header-contents">
        <Link id="link" to="/profile">Profile</Link>
        <Link id="link" to="/alters">Alerts</Link>
        <Link id="link" to="/settings">Settings</Link>
        <Link id="link" to="/Logout">Logout</Link>
      </div>
    </div>
  );
}

export default Header;