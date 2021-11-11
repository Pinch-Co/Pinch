/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable object-shorthand */
import React, {
  useState,
  createContext,
  useContext,
  useEffect,
} from 'react';
// import axios from 'axios';

export const PinchContext = createContext({
  userID: '',
});

export const PinchContextProvider: React.FC = ({ children }) => {
  const [userID, setUserID] = useState<string>('');

  const store = {
    userID: userID,
    setUserID: (id: string): void => {
      setUserID(id);
    },
  };

  return (
    <PinchContext.Provider value={store}>
      {children}
    </PinchContext.Provider>
  );
};

export const usePinchContext = () => useContext(PinchContext);
