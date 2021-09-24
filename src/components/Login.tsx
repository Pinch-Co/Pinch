import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import auth from '../auth/auth';

interface OverviewProps extends RouteComponentProps<{name:string}> {

}

function Login(props:OverviewProps) {
  return (
    <div>
      Please Log in
      <form>
        <input type="text" placeholder="cactus" />
        <input type="text" placeholder="****" />
      </form>
      <button
        type="button"
        onClick={() => {
          auth.login(() => {
            props.history.go(-1);
          });
        }}
      >
        {' '}
        Login
      </button>
    </div>
  );
}

export default Login;
