import React from "react";
import { useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Input from "../../ChildComponents/Input";
import { number } from "./Commonservices/number";
import { SmsEmail } from "../../ChildComponents/validations";
import { useEffect } from "react";
import { toast } from "react-toastify";

function SaveSmsEmail({
  show6,
  state,
  LTData,
  setShow6,
  saveSmsEmail,
  setSaveSmsEmail,
}) {
  const { t } = useTranslation();
  const [err, setErr] = useState({});
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [newSaveSmsEmail, setNewSaveSmsEmail] = useState({
    ...saveSmsEmail,
    SmsToPatient:
      saveSmsEmail?.SmsToPatient && saveSmsEmail?.SmsToPatient != ""
        ? saveSmsEmail?.SmsToPatient
        : state?.Mobile && state?.Mobile != ""
        ? state?.Mobile
        : "",
    EmailToPatient:
      saveSmsEmail?.EmailToPatient && saveSmsEmail?.EmailToPatient != ""
        ? saveSmsEmail?.EmailToPatient
        : state?.Email && state?.Email != ""
        ? state?.Email
        : "",
    SmsToDoctor:
      saveSmsEmail?.SmsToDoctor && saveSmsEmail?.SmsToDoctor != ""
        ? saveSmsEmail?.SmsToDoctor
        : LTData?.DoctorMobile && LTData?.DoctorMobile != ""
        ? LTData?.DoctorMobile
        : "",
    EmailToDoctor:
      saveSmsEmail?.EmailToDoctor && saveSmsEmail?.EmailToDoctor != ""
        ? saveSmsEmail?.EmailToDoctor
        : LTData?.DoctorEmail && LTData?.DoctorEmail != ""
        ? LTData?.DoctorEmail
        : "",
    SmsToClient:
      saveSmsEmail?.SmsToClient && saveSmsEmail?.SmsToClient != ""
        ? saveSmsEmail?.SmsToClient
        : state?.RateTypePhone && state?.RateTypePhone != ""
        ? state?.RateTypePhone
        : "",
    EmailToClient:
      saveSmsEmail?.EmailToClient && saveSmsEmail?.EmailToClient != ""
        ? saveSmsEmail?.EmailToClient
        : state?.RateTypeEmail && state?.RateTypeEmail != ""
        ? state?.RateTypeEmail
        : "",
    IsActiveSmsToPatient: saveSmsEmail?.IsPatientSMS,
    IsActiveEmailToPatient: saveSmsEmail?.IsPatientEmail,
    IsActiveSmsToDoctor: saveSmsEmail?.IsDoctorSMS,
    IsActiveEmailToDoctor: saveSmsEmail?.IsDoctorEmail,
    IsActiveSmsToClient: saveSmsEmail?.IsClientSMS,
    IsActiveEmailToClient: saveSmsEmail?.IsClientEmail,
  });
  console.log(state);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setNewSaveSmsEmail({
      ...newSaveSmsEmail,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const handleSave = () => {
    const generatedError = SmsEmail(newSaveSmsEmail);

    if (generatedError == "") {
      setSaveSmsEmail(newSaveSmsEmail);
      Object.values({
        IsPatientSMS: newSaveSmsEmail?.SmsToPatient,
        IsPatientEmail: newSaveSmsEmail?.EmailToPatient,
        IsDoctorSMS: newSaveSmsEmail?.SmsToDoctor,
        IsDoctorEmail: newSaveSmsEmail?.EmailToDoctor,
        IsDoctorSMS: newSaveSmsEmail?.SmsToClient,
        IsDoctorEmail: newSaveSmsEmail?.EmailToClient,
      }).some((value) => value != "") &&
        toast.success("Details Saved Successfully");
      setShow6(false);
    } else {
      setErr(generatedError);
    }
  };
  console.log(saveSmsEmail);
  console.log(newSaveSmsEmail);

  return (
    <div>
      <Modal show={show6} size="md" centered>
        <Modal.Header className="modal-header">
          <Modal.Title className="modal-title">
            {t("Sms & Email Details")}
          </Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setShow6(false)}
          >
            ×
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="box-body">
            <div className="row">
              <div className="col-12">
                <table
                  className="table table-bordered table-hover table-responsive table-striped tbRecord"
                  cellPadding="{0}"
                  cellSpacing="{0}"
                >
                  <thead>
                    <tr>
                      <th className="text-center">{t("To")}</th>
                      <th className="text-center"> {t("SMS")}</th>
                      <th className="text-center">{t("EMAIL")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <label>Patient</label>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-sm-1">
                            <input
                              type="checkbox"
                              name="IsActiveSmsToPatient"
                              checked={newSaveSmsEmail?.IsActiveSmsToPatient}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-sm-11">
                            <Input
                              className="select-input-box form-control input-sm"
                              name="SmsToPatient"
                              type="number"
                              onInput={(e) => number(e, 10)}
                              value={newSaveSmsEmail?.SmsToPatient}
                              onChange={handleChange}
                            />

                            {newSaveSmsEmail?.SmsToPatient.length > 0 &&
                              newSaveSmsEmail?.SmsToPatient.length < 10 && (
                                <span className="golbal-Error">
                                  {err?.SmsToPatient}
                                </span>
                              )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-sm-1">
                            <input
                              type="checkbox"
                              name="IsActiveEmailToPatient"
                              checked={newSaveSmsEmail?.IsActiveEmailToPatient}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-sm-11">
                            <Input
                              className="select-input-box form-control input-sm"
                              name="EmailToPatient"
                              type="email"
                              max={30}
                              value={newSaveSmsEmail?.EmailToPatient}
                              onChange={handleChange}
                            />
                            {newSaveSmsEmail?.EmailToPatient.trim().length >
                              0 &&
                              !emailRegex.test(
                                newSaveSmsEmail?.EmailToPatient
                              ) && (
                                <span className="golbal-Error">
                                  {err?.EmailToPatient}
                                </span>
                              )}
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Doctor</label>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-sm-1">
                            <input
                              type="checkbox"
                              name="IsActiveSmsToDoctor"
                              checked={newSaveSmsEmail?.IsActiveSmsToDoctor}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-sm-11">
                            <Input
                              className="select-input-box form-control input-sm"
                              name="SmsToDoctor"
                              type="number"
                              onInput={(e) => number(e, 10)}
                              value={newSaveSmsEmail?.SmsToDoctor}
                              onChange={handleChange}
                            />
                            {newSaveSmsEmail?.SmsToDoctor.length > 0 &&
                              newSaveSmsEmail?.SmsToDoctor.length < 10 && (
                                <span className="golbal-Error">
                                  {err?.SmsToDoctor}
                                </span>
                              )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-sm-1">
                            <input
                              type="checkbox"
                              checked={newSaveSmsEmail?.IsActiveEmailToDoctor}
                              name="IsActiveEmailToDoctor"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-sm-11">
                            <Input
                              className="select-input-box form-control input-sm"
                              name="EmailToDoctor"
                              type="email"
                              max={30}
                              value={newSaveSmsEmail?.EmailToDoctor}
                              onChange={handleChange}
                            />
                            {newSaveSmsEmail?.EmailToDoctor.trim().length > 0 &&
                              !emailRegex.test(
                                newSaveSmsEmail?.EmailToDoctor
                              ) && (
                                <span className="golbal-Error">
                                  {err?.EmailToDoctor}
                                </span>
                              )}
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <label>Client</label>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-sm-1">
                            <input
                              type="checkbox"
                              name="IsActiveSmsToClient"
                              checked={newSaveSmsEmail?.IsActiveSmsToClient}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-sm-11">
                            <Input
                              className="select-input-box form-control input-sm"
                              name="SmsToClient"
                              type="number"
                              onInput={(e) => number(e, 10)}
                              value={newSaveSmsEmail?.SmsToClient}
                              onChange={handleChange}
                            />
                            {newSaveSmsEmail?.SmsToClient &&
                              newSaveSmsEmail?.SmsToClient.length > 0 &&
                              newSaveSmsEmail?.SmsToClient.length < 10 && (
                                <span className="golbal-Error">
                                  {err?.SmsToClient}
                                </span>
                              )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-sm-1">
                            <input
                              type="checkbox"
                              checked={newSaveSmsEmail?.IsActiveEmailToClient}
                              name="IsActiveEmailToClient"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-sm-11">
                            <Input
                              className="select-input-box form-control input-sm"
                              name="EmailToClient"
                              type="email"
                              max={30}
                              value={newSaveSmsEmail?.EmailToClient}
                              onChange={handleChange}
                            />
                            {newSaveSmsEmail?.EmailToClient &&
                              newSaveSmsEmail?.EmailToClient.trim().length >
                                0 &&
                              !emailRegex.test(
                                newSaveSmsEmail?.EmailToClient
                              ) && (
                                <span className="golbal-Error">
                                  {err?.EmailToClient}
                                </span>
                              )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="box-footer">
            <div className="row">
              <div className="col-sm-2">
                <button
                  className="btn  btn-success w-100 btn-sm mx-2"
                  onClick={handleSave}
                >
                  {t("Save")}
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SaveSmsEmail;
