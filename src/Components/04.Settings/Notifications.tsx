import * as React from 'react';

function Notification() {
  return (
    <div className="tabs-contents">
      <div className="tabs-header-section">
        <div className="tabs-header-title">
          Notifications
        </div>
        <p className="blurb"> Set up your notification prefrences</p>
        <hr className="tabs-section-cutoff" />
      </div>
      <div className="tabs-information-section">
        <h5 className="section-divider-title">Allow text updates or alerts</h5>
        <h5 className="section-divider-title">Allow email updates or alerts</h5>
        <h5 className="section-divider-title">Recieve subscription price alerts</h5>
      </div>
    </div>
  );
}

export default Notification;
