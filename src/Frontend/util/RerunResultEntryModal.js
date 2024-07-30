import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Input from "../../ChildComponents/Input";
import axios from "axios";
import { SelectBox } from "../../ChildComponents/SelectBox";
import { isChecked } from "./Commonservices";
import { toast } from "react-toastify";
import Loading from "./Loading";

function RerunResultEntryModal({ show, data, handleClose }) {
  const [tableData, setTableData] = useState([]);
  const [DropDownData, setDropDownData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Reason, setReason] = useState("");

  const fetchDropDown = () => {
    axios
      .get("/api/v1/RE/GetRerunresion")
      .then((res) => {
        const data = res?.data?.message?.map((ele) => {
          return {
            label: ele?.RerunResion,
            value: ele?.RerunResion,
          };
        });
        setDropDownData(data);
        setReason(data[0]?.value);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetch = () => {
    axios
      .post("/api/v1/RE/GetRerunData", {
        LabNO: data?.LedgerTransactionNo,
        TestId: data?.TestID,
      })
      .then((res) => {
        const data = res?.data?.message?.map((ele, index) => {
          return {
            ...ele,
            isChecked: false,
          };
        });
        setTableData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChecked = (e, index) => {
    const { name, checked } = e.target;
    if (index >= 0) {
      const data = [...tableData];
      data[index][name] = checked;
      setTableData(data);
    } else {
      const data = tableData.map((ele) => {
        return {
          ...ele,
          [name]: checked,
        };
      });
      setTableData(data);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setReason(value);
  };

  const handleSubmit = () => {
    const payload = tableData.filter((ele) => ele?.isChecked === true);
    if (payload?.length > 0) {
      setLoading(true);
      axios
        .post("/api/v1/RE/savererundata", {
          TestID: data?.TestID,
          LabNo: data?.LedgerTransactionNo,
          Reason: "Check",
          ObservationData: payload,
        })
        .then((res) => {
          toast.success(res?.data?.message);
          handleClose();
          setLoading(false);
        })
        .catch((err) => {
          toast.error(
            err?.data?.message ? err?.data?.message : "Something Went Wrong"
          );
          setLoading(false);
        });
    } else {
      toast.error("Please Choose one Test");
    }
  };

  useEffect(() => {
    fetch();
    fetchDropDown();
  }, []);

  return (
    <Modal show={show}>
      <Modal.Header className="modal-header">
        <Modal.Title className="modal-title" />
        <div style={{ color: "white" }}>{data?.PackageName}</div>
        <button type="button" className="close" onClick={handleClose}>
          ×
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box-body">
          <div className="row">
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
                <thead class="cf">
                  <tr>
                    <th>S.no</th>
                    <th>Parameter</th>
                    <th>Value</th>
                    <th>
                      <Input
                        type="checkbox"
                        name="isChecked"
                        checked={
                          tableData.length > 0
                            ? isChecked("isChecked", tableData, true).includes(
                                false
                              )
                              ? false
                              : true
                            : false
                        }
                        onChange={(e) => handleChecked(e)}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((ele, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{ele?.LabObservationName}</td>
                      <td>{ele?.VALUE}</td>
                      <td>
                        <Input
                          type="checkbox"
                          name="isChecked"
                          checked={ele?.isChecked}
                          onChange={(e) => handleChecked(e, index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-3">
              <label>Rerun Reason:</label>
            </div>
            <div className="col-sm-9">
              <SelectBox
                className="select-input-box form-control input-sm"
                options={DropDownData}
                selectedValue={Reason}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="box-footer">
          <div className="row">
            <div className="col-sm-2">
              <button
                type="button"
                className="btn btn-block btn-danger btn-sm"
                onClick={handleClose}
              >
                Close
              </button>
            </div>

            <div className="col-sm-2">
              {loading ? (
                <Loading />
              ) : (
                <button
                  type="button"
                  className="btn btn-block btn-success btn-sm"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RerunResultEntryModal;
