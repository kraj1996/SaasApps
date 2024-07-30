import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Loading from "./Loading";
import moment from "moment";
function WhatsappSMSCountModal({ smsStatus, show, onHide }) {
  const [tableData, setTableData] = useState([]);
  const [load, setLoad] = useState(false);
  const { t } = useTranslation();

  const getCompanyview = () => {
    setLoad(true);
    axios
      .post("/api/v1/CompanyMaster/getCompanyview", {
        CompanyId: smsStatus,
      })
      .then((res) => {
        setLoad(false);
        setTableData(res?.data?.message);
      })
      .catch((err) => {
        setLoad(false);
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Something Went Wrong"
        );
      });
  };

  useEffect(() => {
    getCompanyview();
  }, []);

  return (
    <Modal {...{ show, onHide }} size="lg" centered>
      <Modal.Header>
        <label style={{ color: "white" }}>{tableData[0]?.pname}</label>
        <div></div>
        <button
          className="fa fa-close"
          style={{ backgroundColor: "red", color: "white" }}
          onClick={onHide}
        ></button>
      </Modal.Header>
      <Modal.Body>
        {load ? (
          <Loading />
        ) : tableData.length > 0 ? (
          <div
            className="box-body divResult table-responsive"
            id="no-more-tables"
          >
            <div className="row">
              <div className="col-12">
                <table
                  className="table table-bordered table-hover table-striped tbRecord"
                  cellPadding="{0}"
                  cellSpacing="{0}"
                >
                  <thead className="cf">
                    <tr>
                      <th>{t("S.No")}</th>
                      <th>{t("dtEntry")}</th>
                      <th>{t("Fromdate")}</th>
                      <th>{t("Todate")}</th>
                      <th>{t("Whatsappcount")}</th>
                      <th>{t("SmsCount")}</th>
                      <th>{t("CreatedbyName")}</th>
                      <th>{t("CompanyName")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{moment(data?.dtEntry).format("DD-MMM-YYYY")}</td>
                        <td>{moment(data?.Fromdate).format("DD-MMM-YYYY")}</td>
                        <td>{moment(data?.Todate).format("DD-MMM-YYYY")}</td>
                        <td>{data?.Whatsappcount}</td>
                        <td>{data?.SmsCount}</td>
                        <td>{data?.CreatedbyName}</td>
                        <td>{data?.CompanyName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <h4 style={{ textAlign: "center" }}>
            <i style={{ color: "red" }}>"No Record Found"</i>
          </h4>
        )}

        <div className="box-footer">
          <div className="row">
            <div className="col-sm-2">
              <button
                className="btn btn-block btn-danger btn-sm"
                onClick={onHide}
              >
                {t("Close")}
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default WhatsappSMSCountModal;
