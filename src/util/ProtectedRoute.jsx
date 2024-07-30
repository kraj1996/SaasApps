import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

export const ProtectedRoute = () => {
  const location = useLocation();
  const isLoggedIn = window.localStorage.getItem("user_Token");
  const CompanyCode = window.localStorage.getItem("CompanyCode");

  const companyMasterRights = () => {
    if (
      CompanyCode?.toLocaleLowerCase() !== "itd" &&
      ["/CompanyMasterList", "/companymaster"].includes(
        window.location.pathname.toLocaleLowerCase()
      )
    ) {
      window.location.replace("/Home");
    }
  };

  useEffect(() => {
    companyMasterRights();
  }, [window.location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location?.pathname]);

  return (
    <React.Fragment>
      {isLoggedIn ? (
        <div class="wrapper">
          <div
            className="wrapper"
            style={{ height: "auto", minHeight: "100%" }}
            data-select2-id="19"
          >
            <Header />
            <Sidebar />
            <div class="content-wrapper">
              <section class="content">
                <Outlet />
              </section>
            </div>
            <Footer />
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </React.Fragment>
  );
};

export const PatientProtectedRoute = () => {
  const location = useLocation();
  const isLoggedIn = window.localStorage.getItem("user_Token");

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location?.pathname]);

  return (
    <React.Fragment>
      {isLoggedIn ? <Outlet /> : <Navigate to="/PatientPortalLogin" />}
    </React.Fragment>
  );
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
        <Navigate to="/home" />
      )}
    </React.Fragment>
  );
};
