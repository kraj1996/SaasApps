import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../Contextapi/userContext";

import axios from "axios";

import companyLogo from "../../images/itLogo.png"
const Header = ({ profileImage, handleProfileChange }) => {
  const { user, clearSelectedApp } = useUser()
  const [centreData, setCentreData] = useState([]);
  const [blink, setBlink] = useState({
    type: -1,
    Hour: "",
    Minute: "",
    Second: "",
  });
  const [message, setMessage] = useState("");
  const companyData = {
    companyName: window.localStorage.getItem("CompanyName"),
    companyCode: window.localStorage.getItem("CompanyCode"),
    companyLogo: window.localStorage.getItem("CompanyLogo"),
  };
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  console.log(currentPath)

  const handleLogout = () => {
    setTimeout(() => {
      window.sessionStorage.clear();
        window.localStorage.clear();
        navigate("/login");
        toast.success("Logout Successfully");
    },500);
    
  };

  const SendEmail = () => {
    const userInput = prompt("Verify Code");
    if (userInput === null) {
      return;
    } else if (userInput === "itdose@") {
      axios
        .get("/api/v1/CommonController/SendEmailDaywisedata")
        .then((res) => {
          toast.success(res?.data?.message);
        })
        .catch((err) => {
          toast.error(
            err?.response?.data?.message
              ? err?.response?.data?.message
              : "Error Occured"
          );
        });
    } else {
      toast.error("Invalid Code.");
    }
  };
  const switchOffAlert = () => {
    axios
      .get("/api/v1/RazorPay/payment")
      .then((res) => {
        // SetMessage(res?.data?.DueDate);
        SetMessage("2024-07-23 19:00:00");
      })
      .catch((err) => {
        console.log(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Error Occured"
        );
      });
  };
  // console.log(blink);
  const SetMessage = (dueDate) => {
    const current = new Date();
    const due = new Date(dueDate);
    const timeDifference = due - current;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    console.log(daysDifference);
    if (daysDifference > 7 && daysDifference <= 15) {
      setMessage("Your account will be locked on " + dueDate);
      setBlink({
        type: 1,
        Hour: "",
        Minute: "",
        Second: "",
      });
    }
    if (daysDifference <= 7 && daysDifference > 1) {
      setMessage("Your account will be locked on " + dueDate);
      setBlink({
        type: 0,
        Hour: "",
        Minute: "",
        Second: "",
      });
    }
    if (daysDifference <= 1 && daysDifference > 0) {
      const interval = setInterval(() => {
        const now = new Date();
        const remainingTime = due - now;
        if (remainingTime <= 0) {
          clearInterval(interval);
          setMessage("Your account has been locked");
        } else {
          const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
          const seconds = Math.floor((remainingTime / 1000) % 60);
          setBlink({
            type: 3,
            Hour: hours,
            Minute: minutes,
            Second: seconds,
          });
          setMessage("");
        }
      }, 1000);
    }
    if (daysDifference <= 0) {
      setMessage("");
      setBlink({
        type: -1,
        Hour: "",
        Minute: "",
        Second: "",
      });
    }
  };
  const handleTheme = (e) => {
    window.localStorage.setItem("Theme", e.target.value);
    window.location.reload();
  };
  const username = window.localStorage.getItem("Username");
  const Company = window.localStorage.getItem("CompanyCode");
  // useEffect(() => {
  //   getGlobalCentres(setCentreData);
  // }, []);

  const getGlobalCentres = (state, centreState, setCentreState) => {
    axios
      .get("/api/v1/Centre/getGlobalCentres")
      .then((res) => {
        let data = res.data.message;
        let CentreDataValue = data.map((ele) => {
          return {
            value: ele.CentreID,
            label: ele.Centre,
          };
        });
        state(CentreDataValue);
        if (centreState) {
          setCentreState({
            ...centreState,
            CentreID: CentreDataValue[0]?.value,
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.sessionStorage.clear();
          window.localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    axios
      .post("/api/v1/Users/ChangeCentre", {
        CentreID: value,
      })
      .then((res) => {
        window.localStorage.setItem("DefaultCentre", value);
        window.location.reload();
      })
      .catch((err) =>
        toast.error(
          err?.data?.response?.message
            ? err?.data?.response?.message
            : "Error Occur"
        )
      );
  };

  const handlePatientLabSearch = (e) => {
    const { value } = e.target;
    const keypress = [9, 13];
    if (keypress.includes(e.which)) {
      if (value.trim() === "") {
        toast.error("Please enter Value");
        return;
      }
      e.preventDefault();
      navigate("/DynamicLabSearch", { state: { data: value.trim() } });
    }
  };
  // useEffect(() => {
  //   i18n.changeLanguage(window?.localStorage?.getItem("language"));
  //   getRejectCount();
  //   switchOffAlert();
  // }, []);
  const handleresetapp=()=>{
    clearSelectedApp();
    navigate('/AppsList')
  }

  return (
    <>
      <div id="html-container"></div>
      <header className="main-header">
        
          <div className="spaceBottom">
            <div  style={{ background: "#00c0ef" }}>
            <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: "10px",
                height:"37px",
		      color: 'white',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        //flexGrow: 1
      }}>
        <img
          src={companyLogo}
          alt="Company Logo"
          style={{
            maxHeight: '20px',
                      marginRight: '4px'
          }}
        />
      </div>
      <ul style={{
        display: 'flex',
        alignItems: 'center',
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        //flexGrow: 2,
        justifyContent: 'center'
      }}>
        <li style={{ marginLeft: '1rem', display: 'flex', alignItems: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center',fontSize: '12px' }} title="Patient Name">
                      <i className="fa fa-user" style={{ marginRight: '0.5rem', fontSize: '13px' }}></i>
                      Mr.Vipin Rawat
                    </span>
                  </li>
                  <li style={{ marginLeft: '1.2rem', display: 'flex', alignItems: 'center' }} title="Centre Name">
                    <span style={{ display: 'flex', alignItems: 'center',fontSize: '12px' }}>
                      <i className="fa fa-hospital-o" style={{ marginRight: '0.5rem', fontSize: '12px' }}></i>
                      OLIVEHEALTHCARE
                    </span>
                  </li>
      </ul>
      {user.selectedApp && user.apps.length > 1 && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexGrow: 1,
                      justifyContent: 'flex-end'
                    }}>
                      <span
                        onClick={handleresetapp}
                        style={{
                          color: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center'
                        }} title="SwitchApps">
                        <i className="fa fa-sign-out" style={{ fontSize: '1.2rem' }}></i>
                      </span>
                    </div>
                  )}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'flex-end'
      }}>
         {currentPath.toLowerCase() !== '/companymaster' && (
        <span
          onClick={() => navigate('/CompanyMaster')}
          style={{
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            marginRight: '10px'
          }}
          title="Create Company"
        >
          <i className="fa fa-building" style={{ fontSize: '1.2rem' }}></i>
        </span>
      )}
      {currentPath.toLowerCase() === '/companymaster' && (
        <span
          onClick={() => navigate('/AppsList')}
          style={{
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            marginRight: '10px'
          }}
          title="Sign Out"
        >
          <i className="fa fa-sign-out" style={{ fontSize: '1.2rem' }}></i>
        </span>
      )}
        
        <span
          onClick={handleLogout}
          style={{
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }} title="Logout">
          <i className="fa fa-power-off" style={{ fontSize: '1.2rem' }}></i>
        </span>
      </div>
    </div>
            </div>
          </div>
      </header>
    </>
  );
};

export default Header;
