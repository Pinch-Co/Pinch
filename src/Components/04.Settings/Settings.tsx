import React, { useState } from 'react';
import YourAccount from './YourAccount';
import Profile from './Profile/Profile';
import Notification from './Notifications';

function Settings() {
  const [show, setShow] = useState<boolean>(true);
  return (
    <div className="settings-outer-container">
      <div className="settings-main-container">
        <div className="settings-tab-container">
          <ul className="settings-tab-list">
            <li className="settings-tab-list-item">Profile</li>
            <li className="settings-tab-list-item">Your Account</li>
            <li className="settings-tab-list-item">Notifications</li>
            <li className="settings-tab-list-item">Settings</li>
          </ul>
        </div>
        <div className="settings-content-container">
          <div className="settings-content-items">
            {show ? <Profile /> : null}
            {/* {show ? <YourAccount /> : null}
            {show ? <Notification /> : null} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
