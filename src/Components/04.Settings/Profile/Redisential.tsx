import * as React from 'react';

function Residential() {
  return (
    <div className="info-section-dropdown">
      <p className="info-section-question-title">Residential Status</p>
      <select name="residential-stats" id="residential-status">
        <option value="select">Select residential status</option>
        <option value="live with parents">Live with parents /relatives</option>
        <option value="couch">Couch surfing</option>
        <option value="roomates">Renting with friends</option>
        <option value="by myself">Renting by myself</option>
        <option value="campus">Campus Housing</option>
        <option value="condo owner">I own a condo</option>
        <option value="home owner">I own a house</option>
      </select>
    </div>
  );
}

export default Residential;
