import * as React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <img src="https://i.imgur.com/MZQaH4n.png" alt="logo" className="header-logo" />
      <div className="header-contents">
        <Link id="link" to="/profile" className="link">Profile</Link>
        <Link id="link" to="/alters" className="link">Alerts</Link>
        <Link id="link" to="/settings" className="link">Settings</Link>
        <Link id="link" to="/Logout" className="link">Logout</Link>
      </div>
    </div>
  );
}

export default Header;
