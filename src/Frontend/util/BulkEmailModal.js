import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Input from "../../ChildComponents/Input";
import { getTrimmedData } from "./Commonservices";
import { UploadJSON } from "../../util/Commonservices";
import { toast } from "react-toastify";
import axios from "axios";

function BulkEmailModal({ data, onHide }) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // const [emailId, setEmailId] = useState("");
  const [dataForEmail, setDataForEmail] = useState({
    emailId: "",
    type: "Patient",
    letterHead: 0,
    Signature: 0,
  });

  console.log(data);
  const handleSendEmail = () => {
    if (
      dataForEmail?.emailId?.length == 0 ||
      (dataForEmail?.emailId?.length > 0 &&
        emailRegex.test(dataForEmail?.emailId))
    ) {
      const checkData = data?.data?.filter((ele) => ele?.isChecked === true);
      console.log(checkData);

      const finalData = checkData?.map((ele, _) => {
        return {
          PatientName: ele?.PatientName,
          TestIDHash: ele?.TestIDHash,
          AgeGender: ele?.AgeGender,
          LedgerTransactionNo: ele?.LedgerTransactionNo,
          PatientEmail: ele?.PatientEmail ?? "",
          DoctorEmail: ele?.DoctorEmail ?? "",
          ClientEmail: ele?.ClientEmail ?? "",
          ledgertransactionid: ele?.ledgertransactionid,
          isChecked: ele?.isChecked,
        };
      });
      console.log(finalData);
      const mergedData = {};

      finalData.forEach((item) => {
        if (mergedData[item?.LedgerTransactionNo]) {
          mergedData[item?.LedgerTransactionNo]?.TestIDHash?.push(
            item?.TestIDHash
          );
        } else {
          mergedData[item?.LedgerTransactionNo] = {
            ...item,
            TestIDHash: [item?.TestIDHash],
          };
        }
      });
      const result = Object.values(mergedData);
      console.log(result);
      const finalDataToSend = result?.map((ele, _) => {
        return {
          ...ele,
          TestIDHash: ele?.TestIDHash?.join(","),
        };
      });
      console.log(finalDataToSend);
      UploadJSON(
        "SendEmail",
        getTrimmedData({
          Email: dataForEmail?.emailId?.trim(),
          Data: finalDataToSend,
          Type: dataForEmail?.type,
          PHead:dataForEmail?.letterHead?1:0,
          Signature:dataForEmail?.Signature?1:0
        }),
        "0"
      )
        .then((res) => {
          toast.success(res?.message);
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
  };

  const handleBulkEmailSend = () => {
    axios
      .post("api/v1/Lab/SendEmail", {
        Email: dataForEmail?.emailId,
        EmailCC: "",
        EmailBCC: "",
        LedgerTransactionId: "143",
        ReportType: 2,
        Url: data?.data,
      })
      .then((res) => {
        toast.success(res?.data?.message);
        onHide();
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  return (
    <Modal show={data?.modal}>
      <Modal.Header>
        <label style={{ color: "white" }}></label>
        <div></div>
        <button
          className="fa fa-close"
          style={{ backgroundColor: "red", color: "white" }}
          onClick={onHide}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-sm-2">
            <div className="col-sm-2">
              <Input
                type="radio"
                name="type"
                value="Patient"
                checked={dataForEmail?.type == "Patient"}
                onChange={(e) => {
                  setDataForEmail({
                    ...dataForEmail,
                    type: e.target.value,
                  });
                }}
              />
            </div>
            <label className="col-sm-4">Patient</label>
          </div>
          <div className="col-sm-2">
            <div className="col-sm-2">
              <Input
                type="radio"
                name="type"
                value="Client"
                checked={dataForEmail?.type == "Client"}
                onChange={(e) => {
                  setDataForEmail({
                    ...dataForEmail,
                    type: e.target.value,
                  });
                }}
              />
            </div>
            <label className="col-sm-4">Client</label>
          </div>
          <div className="col-sm-2">
            <div className="col-sm-2">
              <Input
                type="radio"
                name="type"
                value="Doctor"
                checked={dataForEmail?.type == "Doctor"}
                onChange={(e) => {
                  setDataForEmail({
                    ...dataForEmail,
                    type: e.target.value,
                  });
                }}
              />
            </div>
            <label className="col-sm-4">Doctor</label>
          </div>
          <div className="col-sm-3">
            <label htmlFor="letterHead">With LetterHead</label>
            <Input
              type={"checkbox"}
              checked={dataForEmail?.letterHead}
              name="letterHead"
              id="letterHead"
              onChange={(e) => {
                setDataForEmail({
                  ...dataForEmail,
                  [e.target.name]: e.target.checked,
                });
              }}
            />
          </div>
          <div className="col-sm-3">
            <label htmlFor="Signature">With Signature</label>
            <Input
              type={"checkbox"}
              checked={dataForEmail?.Signature}
              name="Signature"
              id="Signature"
              onChange={(e) => {
                setDataForEmail({
                  ...dataForEmail,
                  [e.target.name]: e.target.checked,
                });
              }}
            />
          </div>
        </div>
        <div className="row">
          <label className="col-sm-4">Email ID (if Required) :</label>
          <div className="col-sm-8">
            <Input
              className="select-input-box form-control input-sm "
              name="To"
              value={dataForEmail?.emailId}
              type="email"
              onChange={(e) => {
                setDataForEmail({
                  ...dataForEmail,
                  emailId: e.target.value,
                });
              }}
            />
            {dataForEmail?.emailId?.length > 0 &&
              !emailRegex.test(dataForEmail?.emailId) && (
                <span className="golbal-Error">Enter Valid Email ID</span>
              )}
          </div>
        </div>

        <div className="box-footer">
          <div className="row">
            <div className="col-sm-2">
              <button
                className="btn btn-block btn-success btn-sm"
                onClick={() => {
                  data?.type === "EmailSend"
                    ? handleSendEmail()
                    : handleBulkEmailSend();
                }}
              >
                Send Email
              </button>
            </div>

            <div className="col-sm-2">
              <button
                className="btn btn-block btn-danger btn-sm"
                onClick={onHide}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default BulkEmailModal;
