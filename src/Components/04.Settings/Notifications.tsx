/* eslint-disable jsx-a11y/label-has-associated-control */
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
        <div className="notification-section">
          <div className="info-section-inputs">
            <div className="info-section-inputs-mini">
              <div className="infor-input-option">Yes</div>
              <label className="custom-checkbox">
                <input className="info-me-chk" type="checkbox" id="single" />
                <span className="checkmark" />
              </label>
            </div>
            <div className="info-section-inputs-mini">
              <div className="infor-input-option">No</div>
              <label className="custom-checkbox">
                <input className="info-me-chk" type="checkbox" id="single" />
                <span className="checkmark" />
              </label>
            </div>
          </div>
          <div className="notif-input-container">
            <div className="notif-input-title">if yes, enter your phone number</div>
            <input className="notif-input" type="text" placeholder="(555)-555-5555" />
          </div>
        </div>
        <h5 className="section-divider-title">Allow email updates or alerts</h5>
        <div className="notification-section">
          <div className="info-section-inputs">
            <div className="info-section-inputs-mini">
              <div className="infor-input-option">Yes</div>
              <label className="custom-checkbox">
                <input className="info-me-chk" type="checkbox" id="single" />
                <span className="checkmark" />
              </label>
            </div>
            <div className="info-section-inputs-mini">
              <div className="infor-input-option">No</div>
              <label className="custom-checkbox">
                <input className="info-me-chk" type="checkbox" id="single" />
                <span className="checkmark" />
              </label>
            </div>
          </div>
          <div className="notif-input-container">
            <div className="notif-input-title">if yes, enter your email</div>
            <input className="notif-input" type="text" placeholder="example@email.com" />
          </div>
        </div>
        <h5 className="section-divider-title">Recieve subscription price alerts</h5>
        <div className="notification-section">
          <div className="info-section-inputs">
            <div className="info-section-inputs-mini">
              <div className="infor-input-option">Yes</div>
              <label className="custom-checkbox">
                <input className="info-me-chk" type="checkbox" id="single" />
                <span className="checkmark" />
              </label>
            </div>
            <div className="info-section-inputs-mini">
              <div className="infor-input-option">No</div>
              <label className="custom-checkbox">
                <input className="info-me-chk" type="checkbox" id="single" />
                <span className="checkmark" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
