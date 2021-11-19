/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import AppContext from '../SharedComponents/06.Context/AppContext';

function UserSettings() {
  const [err, setErr] = useState('');
  const [email, setEmail] = useState<string>('');
  const [pass, setPassword] = useState<string>('');
  const { userObj } = React.useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    const headers = { 'Content-Type': 'application/json' };
    axios.post(
      '/graphql',
      JSON.stringify({
        query: `query {getUserInfo(id: "${userObj.id}") {
          email
          password
        }
      }`,
      }), { headers },
    )
      .then((response) => {
        setEmail(response.data.data.getUserInfo.email);
        setPassword(response.data.data.getUserInfo.password);
        const error = response.data.errors;
        setErr(error);
      })
      .catch(() => { });
  }, []);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    alert('WOW YOU ARE DELETING YOUR ACCOUNT!');
    // id is currently hard coded but will be passdown as prop soon
    axios.post('/graphql', JSON.stringify({
      query: `mutation {
        deleteOneAccount {
          id: "617b4ab18042428e32405a6e"
        }
      }`,
    }))
      .then(() => {
        alert('Successfully Deleted Account');
        history.push({ pathname: '/login' });
      })
      .catch((error) => console.log(error));
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
          <input className="userSetting-input" type="text" placeholder={email} readOnly />
        </div>
        <h5 className="section-divider-title">Your password</h5>
        <div className="userSetting-input-container">
          <input className="userSetting-input" type="text" placeholder={pass} readOnly />
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
