import React from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const AuditTrailMoadal = ({ show, handleClose, data, testname }) => {
  const { t } = useTranslation();
  console.log(testname);
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header className="modal-header">
        <Modal.Title className="modal-title" />
        <button type="button" className="close" onClick={handleClose}>
          ×
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-sm-6">Test Name : {testname}</div>
        </div>
        <div className="box">
          <div
            className=" box-body divResult boottable table-responsive"
            id="no-more-tables"
          >
            <table
              className="table table-bordered table-hover table-striped tbRecord"
              cellPadding="{0}"
              cellSpacing="{0}"
              style={{ whiteSpace: "normal" }}
            >
              <thead
                className="cf"
                style={{
                  position: "sticky",
                  top: -2,
                  overflow: "auto",
                }}
              >
                <tr>
                  <th>{t("EntryDateTime")}</th>
                  <th>{t("Parameter")}</th>
                  <th>{t("Value")}</th>
                  <th>{t("Old Value")}</th>
                  <th>{t("Min Value")}</th>
                  <th>{t("Max Value")}</th>
                  <th>{t("Reading Formate")}</th>
                  <th>{t("Display Reading")}</th>
                  <th>{t("Machine Name")}</th>
                  <th>{t("Min Critical")}</th>
                  <th>{t("Max Critical")}</th>
                  <th>{t("Result Enterd By")}</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.length > 0 &&
                  data.map((ele, index) => {
                    return (
                      <tr key={index}>
                        <td>{ele?.EntryDateTime}</td>
                        <td>{ele?.LabObservationName}</td>
                        <td>{ele?.Value}</td>
                        <td>{ele?.OldValue}</td>
                        <td>{ele?.MinValue}</td>
                        <td>{ele?.MaxValue}</td>
                        <td>{ele?.ReadingFormat}</td>
                        <td>{ele?.DisplayReading}</td>
                        <td>{ele?.MachineName}</td>
                        <td>{ele?.MinCritical}</td>
                        <td>{ele?.MaxCritical}</td>
                        <td>{ele?.ResultEnteredName}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="box-body">
          <div className="row">
            <div className="col-sm-2">
              <button
                type="button"
                className="btn btn-block btn-danger btn-sm"
                onClick={handleClose}
              >
                {t("Close")}
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AuditTrailMoadal;
