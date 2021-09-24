// import * as React from 'react';
// import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
// import Auth from '../auth/auth';

// /* This prop type error should resolve once we start using typescript types/interfaces.
//  * No need to install prop-types */

// function ProtectedRoute({ component: Component, ...rest }) {
//   console.log('component', Component);
//   return (
//     <Route
//       {...rest}
//       render={(props: RouteComponentProps) => (Auth.authenticated === true
//         ? <Component {...props} />
//         : (
//           <Redirect to={
//           {
//             pathname: '/home',
//             state: {
//               from: props.location,
//             },
//           }
//         }
//           />
//         )
//       )}
//     />
//   );
// }

// export default ProtectedRoute;
