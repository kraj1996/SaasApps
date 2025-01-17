import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Loading from "./Loading";
import axios from "axios";
import { IsMaskingCheck } from "../../util/Commonservices";
const PatientDetailModal = ({ showPH, setShowPH, ResultData, Index }) => {
  const { t } = useTranslation();
  const [patientData, setPatientData] = useState([]);
  const [load, setLoad] = useState(false);
  console.log(Index, ResultData);
  const getPatientDetailData = () => {
    setLoad(true);
    axios
      .post("/api/v1/RECulture/GetPatientDetail", {
        LedgerTransactionNo: Index
          ? ResultData[Index]?.LedgerTransactionNo
          : ResultData[0]?.LedgerTransactionNo,
        TestId: Index ? [ResultData[Index]?.TestID] : [ResultData[0]?.TestID],
      })
      .then((res) => {
        setLoad(false);
        if (res?.data?.message?.length > 0) setPatientData(res?.data?.message);
        else {
          toast.error("No Data Found");
          setShowPH(false);
        }
      })
      .catch((err) => {
        setLoad(false);
        setShowPH(false);
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Something Went Wrong"
        );
      });
  };
  useEffect(() => {
    getPatientDetailData();
  }, []);
  return (
    <Modal show={showPH} style={{ backgroundColor: "black" }} size="lg">
      <div className="box-success">
        <Modal.Header
          className="modal-header"
          style={{ position: "sticky", zIndex: 1055, top: 0 }}
        >
          <Modal.Title className="modal-title">Sample Information</Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => {
              setShowPH(false);
            }}
          >
            ×
          </button>
        </Modal.Header>
        <Modal.Body>
          {load ? (
            <Loading />
          ) : (
            <div className="box with-border">
              <div className="box-header box-success">
                <div className="row">
                  <h4 className="box-title">{t(" Sample Info")}</h4>
                </div>
                <div className="box" style={{ border: "1px solid grey" }}>
                  <div className="box-body">
                    <div className="row">
                      <div className="col-md-4">
                          <label>{t("Visit No")} : &nbsp;</label>
                        {patientData[0]?.LedgerTransactionNo}
                      </div>
                      <div className="col-md-4">
                        <label>{t("Sample Type")} : &nbsp;</label>
                        {patientData[0]?.SampleType}
                      </div>
                      <div className="col-md-4">
                        <label>{t("Patient Name")} : &nbsp;</label>
                        {patientData[0]?.PName}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <label>{t("Age / Sex")} : &nbsp;</label>
                        {patientData[0]?.Age}
                      </div>
                      <div className="col-md-4">
                        <label>{t("Phone / Mobile")} : &nbsp;</label>

                        {patientData[0]?.Mobile}
                      </div>
                      <div className="col-md-4">
                        <label>{t("Department")} : &nbsp;</label>
                        {patientData[0]?.DepartmentName}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <label>{t("Refer Doctor")} : &nbsp;</label>
                        {patientData[0]?.ReferDoctor}
                      </div>
                      <div className="col-md-4">
                        <label>{t("PCC Code")} : &nbsp;</label>
                        {patientData[0]?.PatientCode}
                      </div>
                      <div className="col-md-4">
                        <label>{t("Patient Type")} : &nbsp;</label>
                        {patientData[0]?.PatientType}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <label>{t("SIN")} : &nbsp;</label>
                        {patientData[0]?.BarcodeNo}
                      </div>
                      <div className="col-md-4">
                        <label>{t("UHID")} : &nbsp;</label>
                        {patientData[0]?.PatientCode}
                      </div>
                      <div className="col-md-4">
                        <label>{t("DOB")} : &nbsp;</label>
                        {patientData[0]?.DOB}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <label>{t("Comments ")} : &nbsp;</label>
                        {patientData[0]?.Comments}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-header">
                {/* <div className="row">
                  <h4 className="box-title">{t("Test List")}</h4>
                </div> */}
                <div
                  className="row divResult boottable table-responsive"
                  id="no-more-tables"
                >
                  <table
                    className="table table-bordered table-hover table-striped tbRecord"
                    cellPadding="{0}"
                    cellSpacing="{0}"
                  >
                    <thead className="cf text-center" style={{ zIndex: 99 }}>
                      <tr>
                        <th className="text-center">
                          {t("Investigation Name")}
                        </th>
                        <th className="text-center">
                          {t("Sample Drawn Date")}
                        </th>
                        <th className="text-center">{t("Work Order By")}</th>
                        <th className="text-center">
                          {t("Registration Date")}
                        </th>
                        <th className="text-center">{t("Registered By")}</th>
                        <th className="text-center">{t("Received Date")}</th>
                        <th className="text-center">{t("Received By")}</th>
                        <th className="text-center">{t("Rejected Date")}</th>
                        <th className="text-center">{t("Rejected By")}</th>
                        <th className="text-center">
                          {t("Sample Rejected Reason")}
                        </th>
                        <th className="text-center">
                          {t("Result Entered Date")}
                        </th>
                        <th className="text-center">
                          {t("Result Entered By")}
                        </th>
                        <th className="text-center">{t("Approved Date")}</th>
                        <th className="text-center">{t("Approved By")}</th>
                        <th className="text-center">
                          {t("Approved Login By")}
                        </th>
                        <th className="text-center">{t("Hold By")}</th>
                        <th className="text-center">{t("Hold Reason")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patientData?.map((ele, index) => (
                        <>
                          <tr key={index}>
                            <td
                              data-title="Investigation Name"
                              className="text-center"
                            >
                              {ele?.TestName}&nbsp;
                            </td>
                            <td
                              data-title="Sample Drawn Date"
                              className="text-center"
                            >
                              {ele?.SampleReceiveDate}&nbsp;
                            </td>
                            <td
                              data-title="Work Order By"
                              className="text-center"
                            >
                              {ele?.WorkOrderBy}&nbsp;
                            </td>
                            <td
                              data-title="Registration Date"
                              className="text-center"
                            >
                              {ele?.RegDate}&nbsp;
                            </td>
                            <td
                              data-title="Registered By"
                              className="text-center"
                            >
                              {ele?.RegisterdBy}&nbsp;
                            </td>
                            <td
                              data-title="Received Date"
                              className="text-center"
                            >
                              {ele?.SampleReceiveDate}&nbsp;
                            </td>
                            <td
                              data-title="Received By"
                              className="text-center"
                            >
                              {ele?.SampleReceivedBy}&nbsp;
                            </td>
                            <td
                              data-title="Rejected Date"
                              className="text-center"
                            >
                              {ele?.RejectDate}&nbsp;
                            </td>
                            <td
                              data-title="Rejected By"
                              className="text-center"
                            >
                              {ele?.RejectUser}&nbsp;
                            </td>
                            <td
                              data-title="Sample Rejected Reason"
                              className="text-center"
                            >
                              {ele?.RejectionReason}&nbsp;
                            </td>
                            <td
                              data-title="Result Entered Date"
                              className="text-center"
                            >
                              {ele?.ResultEnteredDate}&nbsp;
                            </td>
                            <td
                              data-title="Result Entered By"
                              className="text-center"
                            >
                              {ele?.ResultEnteredName}&nbsp;
                            </td>
                            <td
                              data-title="Approved Date"
                              className="text-center"
                            >
                              {ele?.ApprovedDate}&nbsp;
                            </td>
                            <td
                              data-title="Approved By"
                              className="text-center"
                            >
                              {ele?.ApprovedBy}&nbsp;
                            </td>
                            <td
                              data-title="Approved Login By"
                              className="text-center"
                            >
                              {ele?.ApprovedName}&nbsp;
                            </td>
                            <td data-title="Hold By" className="text-center">
                              {ele?.holdByName}&nbsp;
                            </td>
                            <td
                              data-title="Hold Reason"
                              className="text-center"
                            >
                              {ele?.Hold_Reason}&nbsp;
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default PatientDetailModal;
