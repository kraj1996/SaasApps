import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../util/Loading";
import UseCurrentLocation from "../Customhooks/UseCurrentLocation";

const LoginForm = ({ handleRoleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
   const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  
  
  const { location, address, error, getLocation } = UseCurrentLocation();

  useEffect(() => {
    getLocation(); // Fetch location when the component mounts
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please fill in both fields");
      return;
    }
    
    setLoad(true);
    
    // Simulate setting token and other details in localStorage
    setTimeout(() => {
      window.localStorage.setItem("user_Token", "dummyToken");
      window.localStorage.setItem("Username", username);
      window.localStorage.setItem("role", 1);
      window.localStorage.setItem("CompanyCode", "dummyCompanyCode");
      window.localStorage.setItem("DefaultCentre", "dummyCentreID");
      window.localStorage.setItem("Theme", "dummyTheme");
      window.localStorage.setItem("Showdashboard", "dummyDashboard");
      window.localStorage.setItem("CompanyName", "dummyCompanyName");
      window.localStorage.setItem("CompanyLogo", "dummyLogoUrl");
      if (location.latitude && location.longitude) {
        window.localStorage.setItem("Latitude", location.latitude);
        window.localStorage.setItem("Longitude", location.longitude);
      }
      if (address) {
        window.localStorage.setItem("Address", address);
      }

      window.location.replace("/AppsList");
      toast.success("Login Successfully");
      
      setLoad(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <h4>Welcome</h4>
        </div>
        <div className="login-box-body">
          <p className="login-box-msg">Sign in to start your session</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <i className="fa fa-user form-control-icon"></i>
            </div>
            <div className="form-group">
              <input
                type={showPassword?'text':'password'}
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="fa fa-lock form-control-icon"></i>
            </div>
            <div className="col-sm-12" style={{ display: "flex" }}>
              <div>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={toggleShowPassword}
                ></input>
              </div>
              <div style={{ marginLeft: "10px" }}>Show Password</div>
            </div>
            <div className="form-actions">
              {load ? (
                <Loading />
              ) : (
                <button type="submit" className="btn btn-primary btn-block">
                  Sign In
                </button>
              )}
            </div>
          </form>
          <div className="form-links">
            <Link to="/forgotPassword">I forgot my password</Link>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
