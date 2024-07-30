import React from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";

const MembershipModal = ({
  data,
  show7,
  handleclosemembership,
  handleSelectedData
}) => {
  const { t } = useTranslation();

  console.log(data);
  return (
    <>
      <Modal show={show7} size="md" onHide={handleclosemembership} id="membermodal">
        <div
          className="box-success"
          style={{
            backgroundColor: "transparent",
          }}
        >
          <Modal.Header className="modal-header">
            <Modal.Title className="modal-title">
              {t("Membership Card Detail")}
            </Modal.Title>
            <button
              type="button"
              className="close"
              onClick={handleclosemembership}
            >
              ×
            </button>
          </Modal.Header>
          <Modal.Body>
            <div className="box-body">
              <div
                className="box-body divResult table-responsive boottable"
                id="no-more-tables"
              >
                <div className="row">
                  <table
                    className="table table-bordered table-hover table-striped table-responsive tbRecord"
                    cellPadding="{0}"
                    cellSpacing="{0}"
                  >
                    <thead className="cf text-center" style={{ zIndex: 99 }}>
                      <tr>
                        <th className="text-center">{t("Select")}</th>
                        <th className="text-center">{t("Name")}</th>
                        <th className="text-center">{t("Age")}</th>
                        <th className="text-center">{t("Primary")}</th>
                        <th className="text-center">{t("MembershipCard")}</th>
                        <th className="text-center">{t("PatientCode")}</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.map((ele, index) => (
                        <tr key={index} style={{ color: "black" }}>
                          <td data-title="Select" className="text-center">
                            <button
                              type="button"
                              className="btn btn-info btn-sm"
                              onClick={() => {
                                handleSelectedData(ele);
                              }}
                            >
                              {t("Select")}
                            </button>
                          </td>
                          <td data-title="Name" className="text-center">
                            {` ${ele?.Title}${ele?.FirstName} ${ele?.MiddleName} ${ele?.LastName}`}
                            &nbsp;
                          </td>
                          <td data-title="Age" className="text-center">
                            {ele.Age}&nbsp;
                          </td>

                          <td data-title="Primary" className="text-center">
                            {ele.FamilyMemberIsPrimary === 1 ? "Self" : "Dependent"}
                            &nbsp;
                          </td>
                          <td
                            data-title="MembershipCard"
                            className="text-center"
                          >
                            {ele.MembershipCardName}&nbsp;
                          </td>
                          <td
                            data-title="PatientCode"
                            className="text-center"
                          >
                            {ele.PatientCode}&nbsp;
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="box-footer">
              <div className="col-sm-2">
                <button
                  type="button"
                  className="btn btn-danger  btn-sm"
                  onClick={() => {
                    
                    handleclosemembership();
                  }}
                >
                  {t("Close")}
                </button>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default MembershipModal;
