import * as React from 'react';

function UserSettings() {
  return (
    <div className="tabs-contents">
      <div className="tabs-header-section">
        <div className="tabs-header-title">
          Settings
        </div>
        <p className="blurb"> Set up your account</p>
        <hr className="tabs-section-cutoff" />
      </div>
      <div className="tabs-information-section">
        <h5 className="section-divider-title">Dark / Light Mode</h5>
        <h5 className="section-divider-title">Your email</h5>
        <h5 className="section-divider-title">Your password</h5>
        <h5 className="section-divider-title">Your security question</h5>
      </div>
    </div>
  );
}

export default UserSettings;
