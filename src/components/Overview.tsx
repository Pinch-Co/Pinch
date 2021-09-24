import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import auth from '../auth/auth';

interface OverviewProps extends RouteComponentProps<{name:string}> {

}

function Overview(props:OverviewProps) {
  return (
    <div>
      This is the overview component
      <button
        type="button"
        onClick={() => {
          auth.logout(() => {
            props.history.push('');
          });
        }}
      >
        {' '}
        Logout
      </button>
    </div>
  );
}

export default Overview;
