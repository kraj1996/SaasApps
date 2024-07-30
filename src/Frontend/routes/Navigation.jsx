import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  ProtectedRoute,
  HomeRouter,
  PatientProtectedRoute,
} from "../util/ProtectedRoute";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import LoginAdminLte from "../Login/LoginAdminLte";
import ForgetPassword from "../Login/ForgetPassword";

import SearchList from "../DoctorApproval/SerachList";
import PatientSearch from "../DocUpload/PatientSearch";
import { UserProvider } from "../../Contextapi/userContext";
import AppsList from "../Components/AppsList";
import Layout from "../Components/Layout";
import RedirectRoute from "./RedirectRoute";
import CompanyMaster from "../Components/Master/CompanyMaster";


const Navigation = () => {
  
return (
  <UserProvider>
  <BrowserRouter>
    <ToastContainer autoClose={1000} pauseOnFocusLoss={false} />
    <Routes>
      {/* before login routes */}
      <Route path="/" element={<HomeRouter />}>
        <Route path="/" element={<Navigate to="/Login" replace />} />
        <Route path="/Login" element={<LoginAdminLte />} />
        <Route path="/forgotPassword" element={<ForgetPassword />} />
      </Route>

      {/* after login routes */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<RedirectRoute />} />
          <Route path="/CompanyMaster" element={<CompanyMaster />} />
          <Route path="/AppsList" element={<AppsList />} />
          <Route path="/Search" element={<ProtectedRoute requiredApp="Search" />}>
            <Route path="/Search" element={<SearchList />} />
          </Route>
          <Route path="/PatientSearch" element={<ProtectedRoute requiredApp="PatientSearch" />}>
            <Route path="/PatientSearch" element={<PatientSearch />} />
          </Route>
        </Route>
      </Route>

      {/* catch-all route */}
      <Route path="*" element={<RedirectRoute />} />
    </Routes>
  </BrowserRouter>
</UserProvider>
  );
};

export default Navigation;
