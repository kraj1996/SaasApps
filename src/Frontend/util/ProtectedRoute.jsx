import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useUser } from "../../Contextapi/userContext";


export const ProtectedRoute = ({ requiredApp }) => {
  const location = useLocation();
  const { user } = useUser();
  const { isLoggedIn, selectedApp } = user;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location?.pathname]);

  if (!isLoggedIn) {
    return <Navigate to="/Login" />;
  }

  if (requiredApp && (!user.apps.includes(requiredApp) || selectedApp !== requiredApp)) {
    return <Navigate to="/AppsList" />;
  }

  return <Outlet />;
};





export const HomeRouter = () => {
  const isLoggedIn = window.localStorage.getItem("user_Token");

  return (
    <React.Fragment>
      {!isLoggedIn ? (
        <div
          class="wrapper"
          style={{ backgroundColor: "grey", height: "100vh" }}
        >
          <Outlet />
        </div>
      ) : (
        <Navigate to="/Search" />
      )}
    </React.Fragment>
  );
};
