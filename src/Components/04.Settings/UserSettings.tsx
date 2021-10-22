/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import axios from 'axios';

function UserSettings() {
  const [err, setErr] = useState('');

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    alert('WOW YOU ARE DELETING YOUR ACCOUNT!');

    const headers = { 'Content-Type': 'application/json' };
    axios.post(
      'http://localhost:4000/graphql',
      JSON.stringify({
        query: `mutation {login(email: "") {
          user {
            id
            firstName
            lastName
            email
          }
        }
      }`,
      }), { headers },
    )
      .then((response) => {
        const error = response.data.errors;
        setErr(error);
      })
      .catch(() => { });
  };

  return (
    <div className="tabs-contents">
      <div className="tabs-header-section">
        <div className="tabs-header-title">
          Settings
        </div>
        <p className="blurb"> Account Settings</p>
        <hr className="tabs-section-cutoff" />
      </div>
      {err ? <p>{err}</p> : null}
      <div className="tabs-information-section">
        {/* <h5 className="section-divider-title">Dark / Light Mode</h5> */}
        <h5 className="section-divider-title">Your email</h5>
        <div className="userSetting-input-container">
          <input className="userSetting-input" type="text" />
        </div>
        <h5 className="section-divider-title">Your password</h5>
        <div className="userSetting-input-container">
          <input className="userSetting-input" type="text" />
        </div>
        <div className="userSetting-delete-container">
          <button className="userSetting-delete-button" type="submit" onClick={(event) => handleSubmit(event)}>Delete Account</button>
          <div className="delete-warning-text">
            <p className="warning-text">Warning: When deleting account, all information and access will be permenantley deleted for security reasons</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
