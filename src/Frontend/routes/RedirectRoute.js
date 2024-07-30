import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../Contextapi/userContext';

const RedirectRoute = () => {
  const { user } = useUser();

  if (!user.isLoggedIn) {
    return <Navigate to="/Login" replace />;
  }

  return <Navigate to="/AppsList" replace />;
};

export default RedirectRoute;
