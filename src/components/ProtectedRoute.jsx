import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../auth/auth';

/* This prop type error should resolve once we start using typescript types/interfaces.
 * No need to install prop-types */

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (Auth.isAuthenticated === true
        ? <Component {...props} />
        : (
          <Redirect to={
          {
            pathname: '/home',
            state: {
              from: props.location,
            },
          }
        }
          />
        )
      )}
    />
  );
}

export default ProtectedRoute;
