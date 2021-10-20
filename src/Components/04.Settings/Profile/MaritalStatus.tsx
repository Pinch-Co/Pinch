import * as React from 'react';

function MaritalStatus() {
  return (
    <div className="profile-question-section">
      <p className="info-section-question-title">Marital Status</p>
      <div className="info-section-inputs">
        <div className="info-section-inputs-mini">
          <div className="infor-input-option">Single</div>
          <input className="info-me-chk" type="checkbox" id="single" />
        </div>
        <div className="info-section-inputs-mini">
          <div className="infor-input-option">Married</div>
          <input className="info-me-chk" type="checkbox" id="married" />
        </div>
        <div className="info-section-inputs-mini">
          <div className="infor-input-option">Living Together</div>
          <input className="info-me-chk" type="checkbox" id="livingTogether" />
        </div>
        <div className="info-section-inputs-mini">
          <div className="infor-input-option">Divorced</div>
          <input className="info-me-chk" type="checkbox" id="divorced" />
        </div>
      </div>
    </div>
  );
}

export default MaritalStatus;
