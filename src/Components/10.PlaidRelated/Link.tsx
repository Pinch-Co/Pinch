/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useCallback, useState, FunctionComponent } from 'react';
import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
} from 'react-plaid-link';

interface Props {
  token: string;
}

const PlaidLink: FunctionComponent<Props> = ({ token }) => {
  const [show, setShow] = useState<boolean>(false);
  const [turnoff, setTurnoff] = useState<boolean>(true);
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    (public_token, metadata) => {
      // send public_token to server
      console.log(public_token);
      console.log('metadata', metadata);
      setTurnoff(false);
      setShow(true);
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
        <button className="connect-bank-btn" type="submit" onClick={() => open()} disabled={!ready}>
          Connect a bank account
        </button>
      ) : null}
      {show ? (<div className="connect-bank-success"><p className="success-message">Bank successfully connected!</p></div>) : null}
    </div>
  );
};

export default PlaidLink;
