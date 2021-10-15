import React from 'react';
// import { RouteComponentProps } from 'react-router-dom';

function Additionalinfo() {
  return (
    <div className="additional-info-container">
      <div className="additional-info-empty-div" />
      <div className="additional-info-center-div">
        <div className="additional-info-main-div">
          <div className="additional-info-page-logo-div">
            <img className="pinch-logo" src="https://i.imgur.com/MZQaH4n.png" alt="pinch logo" />
          </div>
          <div className="additional-info-credentials-div">
            <div className="additional-info-title">We Just Need A Few More Details...</div>
            <form className="additional-info-form">
              <div className="additional-info-input-blocks">
                <div className="boxes">
                  <div className="additional-info-input-title">First Name</div>
                  <div className="input-container">
                    <input
                      className="additional-info-input"
                      type="text"
                      placeholder="John"
                    // onChange={(event) => handleEmail(event)}
                    />
                  </div>
                </div>
                <div className="boxes">
                  <div className="additional-info-input-title">Last Name</div>
                  <div className="input-container">
                    <input
                      className="additional-info-input"
                      type="text"
                      placeholder="Doe"
                    // onChange={(event) => handleEmail(event)}
                    />
                  </div>
                </div>
              </div>
              <div className="additional-info-input-blocks">
                <div className="boxes">
                  <div className="additional-info-input-title">Username</div>
                  <div className="input-container">
                    <input
                      className="additional-info-input"
                      type="text"
                      placeholder="JD123"
                    // onChange={(event) => handleEmail(event)}
                    />
                  </div>
                </div>
                <div className="boxes">
                  <div className="additional-info-input-title">Date of Birth</div>
                  <div className="input-container">
                    <input
                      className="additional-info-input"
                      type="date"
                      placeholder="MM/DD/YY"
                    // onChange={(event) => handleEmail(event)}
                    />
                  </div>
                </div>
              </div>
              <div className="address-input">
                <div className="additional-info-input-title">Address</div>
                <div className="input-container">
                  <input
                    className="additional-info-input-address"
                    type="text"
                    placeholder="123 James Street, North Pole"
                  // onChange={(event) => handleEmail(event)}
                  />
                </div>
              </div>
            </form>
            <button
              className="signin-additional-info-btn"
              type="submit"
            // onClick={(event) => handleSubmit(event)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Additionalinfo;
