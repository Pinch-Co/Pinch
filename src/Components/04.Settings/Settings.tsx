/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import YourAccount from './YourAccount';
import Profile from './Profile/Profile';
import Notification from './Notifications';
import UserSettings from './UserSettings';

function Settings() {
  const [show, setShow] = useState<boolean>(true);
  const [account, setAccount] = useState<boolean>(false);
  const [notif, setNotif] = useState<boolean>(false);
  const [settings, setSettings] = useState<boolean>(false);

  const clickMe = () => {
    // event.preventDefault();
    setShow(true);
    setNotif(false);
    setSettings(false);
    setAccount(false);
  };
  const clickAccount = () => {
    // event.preventDefault();
    setAccount(true);
    setShow(false);
    setNotif(false);
    setSettings(false);
  };
  const clickNotif = () => {
    // event.preventDefault();
    setNotif(true);
    setAccount(false);
    setShow(false);
    setSettings(false);
  };
  const clickSettings = () => {
    // event.preventDefault();
    setSettings(true);
    setNotif(false);
    setAccount(false);
    setShow(false);
  };

  return (
    <div className="settings-outer-container">
      <div className="settings-main-container">
        <div className="settings-tab-container">
          <ul className="settings-tab-list">
            <li className="settings-tab-list-item" onClick={clickMe}>
              Profile
            </li>
            <li className="settings-tab-list-item" onClick={clickAccount}>Your Account</li>
            <li className="settings-tab-list-item" onClick={clickNotif}>Notifications</li>
            <li className="settings-tab-list-item" onClick={clickSettings}>Settings</li>
          </ul>
        </div>
        <div className="settings-content-container">
          <div className="settings-content-items">
            {show ? <Profile /> : null}
            {account ? <YourAccount /> : null}
            {notif ? <Notification /> : null}
            {settings ? <UserSettings /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
