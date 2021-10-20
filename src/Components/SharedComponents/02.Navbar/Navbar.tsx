import * as React from 'react';
import { Link } from 'react-router-dom';
// import styles from '../../../Styles/SharedComponents/02.Navbar/Navbar.css';

function Navbar() {
  return (
    <div className="navbar-container-div">
      <div className="navbar-main-div">
        <Link className="navbar-links" id="link" to="/home/overview">Overview</Link>
        <Link className="navbar-links" id="link" to="/home/goals">Goals</Link>
        <Link className="navbar-links" id="link" to="/home/budget">Budget Breakdown</Link>
        <Link className="navbar-links" id="link" to="/home/subscriptions">Subscriptions</Link>
        {/* <Link className="navbar-links" id="link" to="/home/credit">Credit Payments</Link> */}
      </div>
    </div>
  );
}

export default Navbar;
