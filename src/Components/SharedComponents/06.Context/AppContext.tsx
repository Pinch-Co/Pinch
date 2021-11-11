/* eslint-disable no-unused-vars */
import React, { createContext } from 'react';

const AppContext = createContext({
  authenticated: false,
  setAuth: (authenticated: boolean) => {},
  showNav: false,
  setNav: (showNav: boolean) => {},
});

export default AppContext;
