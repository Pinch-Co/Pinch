/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import PlaidLink from '../10.PlaidRelated/Link';
import AppContext from '../SharedComponents/06.Context/AppContext';
import auth from '../../auth/auth';

function Additionalinfo(props: any) {
  const history = useHistory();
  const [token, setToken] = useState<string | null>('');
  const [showButton, setButton] = useState<boolean>(false);
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    dateOfBirth: '',
    address: '',
    email: '',
    password: '',
    phone: '',
    access_token: '',
    item_id: '',
  });

  const {
    setNav,
  } = useContext(AppContext);

  if (props.history.location.state) {
    values.email = props.history.location.state.email;
    values.password = props.history.location.state.password;
    values.phone = props.history.location.state.phone;
  }

  useEffect(() => {
    axios.post('/graphql', {
      query: `query { getLinkToken {
      expiration
      link_token
    }}`,
    })
      .then((result) => {
        const resultObj = result.data.data.getLinkToken;
        setToken(resultObj.link_token);
      })
      .catch((error) => console.log('could not get link token', error));
  }, []);

  const handleButton = () => {
    setButton(true);
  };

  const retrieveValues = (obj:any) => {
    const { access_token, item_id } = obj;
    setValues((prevState) => ({
      ...prevState,
      // eslint-disable-next-line quote-props
      'access_token': access_token,
      // eslint-disable-next-line quote-props
      'item_id': item_id,
    }));
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    axios.post('/graphql', {
      query: `mutation {
        createAccount(firstName: "${values.firstName}", lastName: "${values.lastName}", username: "${values.username}", phone: "${values.phone}" email: "${values.email}", password: "${values.password}", accessToken: "${values.access_token}", itemId:"${values.item_id}") {
          id
        }
      }`,
    })
      .then((result) => {
        const returnId = result.data.data.createAccount.id;
        sessionStorage.setItem('id', returnId);
        sessionStorage.setItem('nav', 'true');
        setNav(true);
      })
      .then(() => {
        auth.login(() => {
          history.push({
            pathname: '/home/overview',
          });
        });
      })
      .catch((error) => console.log('there was an error', error));
  };

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
                      name="firstName"
                      placeholder="John"
                      onChange={(event) => handleChange(event)}
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
                      name="lastName"
                      onChange={(event) => handleChange(event)}
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
                      name="username"
                      onChange={(event) => handleChange(event)}
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
                      name="dateOfBirth"
                      onChange={(event) => handleChange(event)}
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
                    name="address"
                    onChange={(event) => handleChange(event)}
                  />
                </div>
              </div>
              {token === null ? <div /> : (
                <PlaidLink
                  retrieveValues={retrieveValues}
                  handleButton={handleButton}
                  token={token}
                />
              )}
            </form>
            {showButton ? (
              <button
                className="signin-additional-info-btn"
                type="submit"
                onClick={(event) => handleSubmit(event)}
              >
                Next
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Additionalinfo;
