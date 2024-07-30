import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoggedIn: !!window.localStorage.getItem("user_Token"),
    apps: ['Search','PatientSearch'],
    selectedApp: null, 
  });

  const selectApp = (app) => {
    setUser((prevState) => ({ ...prevState, selectedApp: app }));
  };
  const clearSelectedApp = () => {
    setUser((prevState) => ({ ...prevState, selectedApp: null }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, selectApp,clearSelectedApp }}>
      {children}
    </UserContext.Provider>
  );
};
