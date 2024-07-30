import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AuditTrailDataTable from "./AuditTrailDataTable";

import { useTranslation } from "react-i18next";
import { IsMaskingCheck } from "../../util/Commonservices";
function CustomModal({ visitID, show, onHide }) {
  const [optionData, setOptionData] = useState([]);

  const [auditValue, setAuditValue] = useState({
    VisitNo: visitID,
    ItemId: "",
  });

  const [tableData, setTableData] = useState([]);
  // i18n start

  const { t } = useTranslation();
  // i18n end

  const handleChange = (e) => {
    setAuditValue({
      ...auditValue,
      ItemId: e.target.value,
    });
  };

  const selectOption = () => {
    axios
      .post("/api/v1/TestData/BindTest", { VisitNo: visitID })
      .then((res) => {
        setOptionData(res?.data?.message);
      })
      .catch((err) => console.log(err));
  };

  const auditApiData = () => {
    axios
      .post("/api/v1/TestData/GetAuditTrailData", auditValue)
      .then((res) => {
        setTableData(res?.data?.message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    selectOption();
  }, [visitID]);

  useEffect(() => {
    auditApiData();
  }, [auditValue.ItemId]);
  return (
    <Modal {...{ show, onHide }} size="lg" centered>
      <Modal.Header>
        <label style={{ color: "white" }}>
          {tableData[0]?.pname}
        </label>

        <button
          className="fa fa-close"
          style={{ backgroundColor: "red", color: "white" }}
          onClick={onHide}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <div className="box-body">
          <div className="row">
            <div className="col-12">
              <select
                className="select-input-box form-control input-sm"
                onChange={handleChange}
              >
                <option value="">{t("All Test")}...</option>
                {optionData.map((data, index) => (
                  <option value={data.ItemId} key={index}>
                    {data.ItemName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <AuditTrailDataTable tableData={tableData} />
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

export default CustomModal;
