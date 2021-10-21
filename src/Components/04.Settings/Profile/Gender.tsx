import * as React from 'react';

function Gender() {
  return (
    <div className="tabs-question-section">
      <p className="info-section-question-title">Gender</p>
      <div className="info-section-inputs">
        <div className="info-section-inputs-mini">
          <div className="infor-input-option">Female</div>
          <input className="info-me-chk" type="checkbox" id="female" />
        </div>
        <div className="info-section-inputs-mini">
          <div className="infor-input-option">Male</div>
          <input className="info-me-chk" type="checkbox" id="male" />
        </div>
        <div className="info-section-inputs-mini">
          <div className="infor-input-option">Other</div>
          <input className="info-me-chk" type="checkbox" id="other" />
        </div>
      </div>
    </div>
  );
}

export default Gender;
