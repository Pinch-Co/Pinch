import * as React from 'react';
import Education from './Education';
import MaritalStatus from './MaritalStatus';
import Gender from './Gender';
import Income from './Income';
import Residential from './Redisential';
import HouseSize from './HouseSize';

function Profile() {
  return (
    <div className="profile-contents">
      <div className="profile-header-section">
        <div className="profile-header-title">
          Profile
        </div>
        <p className="blurb"> Tell us a little about yourself...</p>
        <hr className="profile-section-cutoff" />
      </div>
      <div className="profile-information-section">
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
