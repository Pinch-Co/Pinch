/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import axios from 'axios';
import React, { useCallback, useState, FunctionComponent } from 'react';
import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
} from 'react-plaid-link';

interface Props {
  token: string;
  handleButton: () => void;
  retrieveValues: (obj: any) => void;
}

const PlaidLink: FunctionComponent<Props> = ({ token, handleButton, retrieveValues }) => {
  const [show, setShow] = useState<boolean>(false);
  const [turnoff, setTurnoff] = useState<boolean>(true);
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    (public_token, metadata) => {
      // send public_token to server
      axios.post('/graphql', {
        query: `query {
          getAccess_Token(public_token:"${public_token}") {
            access_token
            item_id
          }
        }`,
      })
        .then((result) => {
          retrieveValues(result.data.data.getAccess_Token);
          setTurnoff(false);
          setShow(true);
          handleButton();
        })
        .catch((error) => console.log('error', error));
    },
    [],
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
    // onExit
    // onEvent
  };

  const { open, ready, error } = usePlaidLink(config);

  return (
    <div className="connect-plaid-div">
      {turnoff ? (
        <button className="connect-bank-btn" type="button" onClick={() => open()} disabled={!ready}>
          Connect a bank account
        </button>
      ) : null}
      {show ? (<div className="connect-bank-success"><p className="success-message">Bank successfully connected!</p></div>) : null}
    </div>
  );
};

export default PlaidLink;
