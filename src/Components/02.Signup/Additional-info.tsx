/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlaidLink from '../10.PlaidRelated/Link';

function Additionalinfo() {
  const [token, setToken] = useState<string | null>('');

  useEffect(() => {
    axios.post('http://localhost:3000/api/create_link_token')
      .then((result) => {
        console.log(result);
        setToken(result.data.link_token);
      })
      .catch((error) => console.log('error in link token', error));
  }, []);

  return (
    <div>
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
                  {token === null ? <div /> : <PlaidLink token={token} />}
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
    </div>
  );
}

export default Additionalinfo;
