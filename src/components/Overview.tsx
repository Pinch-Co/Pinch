import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import auth from '../auth/auth';

interface OverviewProps extends RouteComponentProps<{name:string}> {

}

function Overview(props:OverviewProps) {
  const logout = () => {
    auth.logout(() => {
      props.history.push('');
    });
  };

  return (
    <div>
      This is the overview component
      <button
        type="button"
        onClick={() => {
          logout();
        }}
      >
        {' '}
        Logout
      </button>
    </div>
  );
}

export default Overview;
