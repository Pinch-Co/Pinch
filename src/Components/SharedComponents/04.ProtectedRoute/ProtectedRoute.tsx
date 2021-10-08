import * as React from 'react';
import {
  Route,
  Redirect,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';

type ProtectedRouteProps = {
  authenticated: boolean
  path: RouteProps['path'];
  component: React.ElementType;
}

function ProtectedRoute({ authenticated, component: Component, ...rest }: ProtectedRouteProps) {
  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps) => (authenticated === true
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
