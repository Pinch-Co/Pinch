import * as React from 'react';
import Education from './Education';
import MaritalStatus from './MaritalStatus';
import Gender from './Gender';
import Income from './Income';
import Residential from './Redisential';
import HouseSize from './HouseSize';

function Profile() {
  return (
    <div className="tabs-contents">
      <div className="tabs-header-section">
        <div className="tabs-header-title">
          Profile
        </div>
        <p className="blurb"> Tell us a little about yourself...</p>
        <hr className="tabs-section-cutoff" />
      </div>
      <div className="tabs-information-section">
        <h5 className="section-divider-title">My information</h5>
        <Gender />
        <MaritalStatus />
        <Education />
        <h5 className="section-divider-title">Household information</h5>
        <Income />
        <Residential />
        <HouseSize />
      </div>
    </div>
  );
}

export default Profile;
