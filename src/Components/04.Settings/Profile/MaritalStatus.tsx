/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';

function MaritalStatus() {
  return (
    <div className="tabs-question-section">
      <p className="info-section-question-title">Marital Status</p>
      <div className="info-section-inputs">
        <div className="info-section-inputs-mini">
          <div className="infor-input-option">Single</div>
          <label className="custom-checkbox">
            <input className="info-me-chk" type="checkbox" id="single" />
            <span className="checkmark" />
          </label>
        </div>
        <div className="info-section-inputs-mini">
          <div className="infor-input-option">Married</div>
          <label className="custom-checkbox">
            <input className="info-me-chk" type="checkbox" id="married" />
            <span className="checkmark" />
          </label>
        </div>
        <div className="info-section-inputs-mini">
          <div className="infor-input-option">Living Together</div>
          <label className="custom-checkbox">
            <input className="info-me-chk" type="checkbox" id="living-together" />
            <span className="checkmark" />
          </label>
        </div>
        <div className="info-section-inputs-mini">
          <div className="infor-input-option">Divorced</div>
          <label className="custom-checkbox">
            <input className="info-me-chk" type="checkbox" id="divorced" />
            <span className="checkmark" />
          </label>
        </div>
      </div>
    </div>
  );
}

export default MaritalStatus;
