import * as React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <h1>Navbar</h1>
      <Link id="link" to="/login">Log In</Link>
      <Link id="link" to="/home">Home</Link>
      <Link id="link" to="/home/overview">Overview</Link>
      <Link id="link" to="/home/settings">Settings</Link>
    </div>
  );
}

export default Navbar;
