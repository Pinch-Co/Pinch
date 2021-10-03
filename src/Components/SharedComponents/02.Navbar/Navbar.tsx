import * as React from 'react';
import { Link } from 'react-router-dom';
// import styles from '../../../Styles/SharedComponents/02.Navbar/Navbar.css';

function Navbar() {
  return (
    <div>
      <h1>Navbar</h1>
      <Link id="link" to="/home/overview">Overview</Link>
      <Link id="link" to="/home/goals">Goals</Link>
      <Link id="link" to="/home/budget">Budget Breakdown</Link>
      <Link id="link" to="/home/subscriptions">Subscriptions</Link>
      <Link id="link" to="/home/credit">Credit Payments</Link>
    </div>
  );
}

export default Navbar;
