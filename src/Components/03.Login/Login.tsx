import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Auth from '../../auth/auth';

interface OverviewProps extends RouteComponentProps<{name:string}> {

}

function Login(props:OverviewProps) {
  const login = () => {
    Auth.login(() => {
      props.history.go(-1);
    });
  };

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
          login();
        }}
      >
        {' '}
        Login
      </button>
    </div>
  );
}

export default Login;
