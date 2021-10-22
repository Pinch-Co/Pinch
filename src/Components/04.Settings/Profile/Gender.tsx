/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';

function Gender() {
  return (
    <div className="tabs-question-section">
      <p className="info-section-question-title">Gender</p>
      <div className="info-section-inputs">
        <div className="info-section-inputs-mini">
          <div className="infor-input-option">Female</div>
          <label className="custom-checkbox">
            <input className="info-me-chk" type="checkbox" id="female" />
            <span className="checkmark" />
          </label>
        </div>
        <div className="info-section-inputs-mini">
          <div className="infor-input-option">Male</div>
          <label className="custom-checkbox">
            <input className="info-me-chk" type="checkbox" id="male" />
            <span className="checkmark" />
          </label>
        </div>
        <div className="info-section-inputs-mini">
          <div className="infor-input-option">Other</div>
          <label className="custom-checkbox">
            <input className="info-me-chk" type="checkbox" id="other" />
            <span className="checkmark" />
          </label>
        </div>
      </div>
    </div>
  );
}

export default Gender;
