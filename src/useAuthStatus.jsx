import { useState } from 'react';

let setAuthFunction = null;

export const useAuthStatus = () => {
  const [isAuthenticated, setAuthenticated] = useState(true);
  setAuthFunction = setAuthenticated;
  return [isAuthenticated, setAuthenticated];
};

export const setAuthStatus = (status) => {
  if (setAuthFunction) {
    setAuthFunction(status);
  }
};