/* eslint-disable no-unused-vars */
import React, { createContext } from 'react';

const AppContext = createContext({
  userObj: {
    id: '',
    email: '',
    access_token: '',
    item_id: '',
  },
  setUserObj: (obj: any) => { },
  showNav: false,
  setNav: (showNav: boolean) => { },
});

export default AppContext;
