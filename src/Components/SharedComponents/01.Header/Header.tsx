import * as React from 'react';
import { Link } from 'react-router-dom';

function Header(props: boolean) {
  return (
    <div className="header">
      <div className="header-image">
        <img src="https://i.imgur.com/MZQaH4n.png" alt="logo" className="header-logo" />
      </div>
      <div className="header-contents">
        <Link id="link" to="/home/settings" className="link">Profile</Link>
        <Link id="link" to="/alerts" className="link">Alerts</Link>
        <Link id="link" to="/home/settings" className="link">Settings</Link>
        {props ? <Link id="link" to="/login" className="link">Logout</Link>
          : <Link id="link" to="/login" className="link">Login</Link>}
      </div>
    </div>
  );
}

export default Header;
