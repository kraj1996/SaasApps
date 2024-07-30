import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { dateConfig } from "./DateConfig";
import Loading from "../Frontend/util/Loading";

function OldReportModal({ show, handleClose, value }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPrint, setIsPrint] = useState({
    index: -1,
    isPrinting: false,
    loading: false,
  });

  useEffect(() => {}, []);

  const handleReport = async (TestIDHash, PHead, index) => {
    if (isPrint.index === -1) {
      setIsPrint({ index: index, loading: true });
      await axios
        .post(`/reports/v1/commonReports/GetLabReport`, {
          TestIDHash: TestIDHash,
          PHead: PHead,
        })
        .then((res) => {
          window.open(res?.data?.Url, "_blank");
          setIsPrint({ index: -1, loading: false });
        })
        .catch((err) => {
          setIsPrint({ index: -1, loading: false });
          handleClose();
          toast.error(
            err?.response?.data?.message
              ? err?.response?.data?.message
              : err?.data?.message
          );
        });
    } else {
      toast.warn("Please wait Generating Report");
      // setIsPrint({ index: -1, loading: false });
    }
  };

  const getData = () => {
    axios
      .post("/api/v1/CommonController/OldPatientReports", {
        PatientCode: value,
      })
      .then((response) => {
        let data = response.data.message;
        let groupedData = {};

        data.forEach((item) => {
          let ledgerNo = item.LedgerTransactionNo;
          if (!groupedData[ledgerNo]) {
            groupedData[ledgerNo] = { ...item, keyToPrint: [item.TestIdHash] };
          } else {
            groupedData[ledgerNo].keyToPrint.push(item.TestIdHash);
          }
        });

        let result = Object.values(groupedData);
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);
  return (
    <Modal show={show} size="lg">
      <Modal.Header className="modal-header">
        <Modal.Title className="modal-title">Old Reports </Modal.Title>
        <button type="button" className="close" onClick={handleClose}>
          ×
        </button>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <Loading />
        ) : (
          <div
            className=" box-body divResult boottable table-responsive"
            id="no-more-tables"
          >
            {data.length > 0 ? (
              <table
                className="table table-bordered table-hover table-striped tbRecord"
                cellPadding="{0}"
                cellSpacing="{0}"
                style={{ whiteSpace: "normal" }}
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>PatientId</th>
                    <th>Patient Name</th>
                    <th>Lab Ref No.</th>
                    <th>Date</th>
                    <th>Source</th>
                    <th className="text-centre">View Report</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((ele, index) => (
                    <tr key={index}>
                      <td data-title={"S.No"}>{index + 1}</td>
                      <td data-title={"PatientId"}>{ele?.PatientCode}</td>
                      <td data-title={"Patient Name"}>{ele?.PName}</td>
                      <td data-title={"Lab Ref No."}>
                        {ele?.LedgerTransactionNo}
                      </td>
                      <td data-title={"Lab Ref No."}>
                        {dateConfig(ele?.date)}
                      </td>
                      <td data-title={"Date"}>{ele?.CentreName}</td>

                      <td data-title={"View Report"} className="text-centre">
                        {index === isPrint.index && isPrint.loading ? (
                          <Loading />
                        ) : (
                          <>
                            <i
                              className="fa fa-print iconStyle"
                              style={{
                                cursor: "pointer",
                                textAlign: "center",
                              }}
                              onClick={() =>
                                handleReport(ele?.keyToPrint, 0, index)
                              }
                              title="Print without header"
                            ></i>
                            &nbsp;&nbsp;&nbsp;
                            <i
                              className="fa fa-print iconStyle"
                              style={{
                                color: "red",
                                cursor: "pointer",
                                textAlign: "center",
                              }}
                              onClick={() =>
                                handleReport(ele?.keyToPrint, 1, index)
                              }
                              title="Print with header"
                            ></i>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="col-sm-12 text-centre">No Record Found</div>
            )}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="row m-2">
          <div className="col-sm-2">
            <button
              className="btn btn-danger btn-sm btn-block"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default OldReportModal;
