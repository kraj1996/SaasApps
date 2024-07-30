import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Loading from "../util/Loading";
import Input from "../../ChildComponents/Input";
import i18n from "i18next";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import { PortalLoginSchema } from "../../ValidationSchema";
import { number } from "../util/Commonservices/number";
const initialValues = {
  UserName: "",
  Password: "",
};
const PatientPortalLogin = ({ handleRoleLogin }) => {
  const { t } = useTranslation();
  const [load, setLoad] = useState(false);

  const handleChangeDropDown = (e) => {
    const { value } = e.target;
    window.localStorage.setItem("language", value);
    i18n.changeLanguage(value);
  };

  const { values, errors, handleChange, touched, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: PortalLoginSchema,
    onSubmit: (values, { resetForm }) => {
      setLoad(true);

      axios
        .post("/api/v1/Users/PatientPortallogin", values)
        .then((res) => {
          if (res.data.success) {
            window.localStorage.setItem("role", 2);
            handleRoleLogin(2);
            window.localStorage.setItem(
              "user_Token",
              JSON.stringify(res.data.user)
            );
            window.location.replace(`/DispatchReport`);
            toast.success("Login Successfully");
            setLoad(false);

            resetForm();
          }
        })
        .catch((err) => {
          toast.error(
            err.response.data.message
              ? err.response.data.message
              : "error occured"
          );
          setLoad(false);
          resetForm();
        });
    },
  });
  return (
    <div className="div_login">
      <div
        className="login-box"
        style={{
          border: " 1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <select
          onChange={handleChangeDropDown}
          style={{
            position: "absolute",
            top: "0px",
            right: "10px",
          }}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>

        <div style={{ textAlign: "center" }}>
          <br />
          <h4>Welcome to</h4>
          <h4
            style={{
              fontSize: "30px",
              color: "#5856d6",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            Patient Portal
          </h4>
          {/* <p className="login-box-msg">{t("LogIn to start your session")}</p> */}
        </div>

        <div className="login-box-body">
          <p className="login-box-msg">{t("Sign in to start your session")}</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group has-feedback">
              <Input
                type="text"
                className="form-control"
                placeholder={t("User Name")}
                name="UserName"
                value={values.UserName}
                onChange={handleChange}
                max={25}
              />

              <i
                className="fa fa-user form-control-feedback"
                aria-hidden="true"
              ></i>
              {errors?.UserName && touched?.UserName && (
                <span className="golbal-Error">{errors?.UserName}</span>
              )}
            </div>
            <div className="form-group has-feedback">
              <Input
                type="password"
                className="form-control"
                placeholder={t("Password")}
                name="Password"
                onInput={(e) => number(e, 10)}
                value={values.Password}
                onChange={handleChange}
              />
              <i
                className="fa fa-key form-control-feedback"
                aria-hidden="true"
              ></i>

              {errors?.Password && touched?.Password && (
                <span className="golbal-Error">{errors?.Password}</span>
              )}
            </div>
            <div className="row">
              <div className="col-xs-12">
                {load ? (
                  <Loading />
                ) : (
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-custom-01 btn-block btn-flat btn-success"
                  >
                    {t("Login")}
                  </button>
                )}
              </div>
            </div>
          </form>

          {/* <Link to="/forgotPassword">{t("I forgot my password")}</Link> */}
          <br />
          {/* <a href="register.html" className="text-center">
          {t("Register a new membership")}
        </a> */}
        </div>
      </div>
    </div>
  );
};

export default PatientPortalLogin;
