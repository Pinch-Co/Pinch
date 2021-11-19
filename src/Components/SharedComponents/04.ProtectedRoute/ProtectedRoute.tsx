import * as React from 'react';
import {
  Route,
  Redirect,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import auth from '../../../auth/auth';

type ProtectedRouteProps = {
  path: RouteProps['path'];
  component: React.ElementType;
}

function ProtectedRoute({ component: Component, ...rest }: ProtectedRouteProps) {
  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps) => (auth.isAuthenticated()
        ? <Component {...props} />
        : (
          <Redirect to={
          {
            pathname: '/login',
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
