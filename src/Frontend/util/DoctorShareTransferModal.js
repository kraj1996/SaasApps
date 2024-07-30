import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { SelectBox } from "../../ChildComponents/SelectBox";
import { selectedValueCheck } from "./Commonservices";
import axios from "axios";
import { toast } from "react-toastify";

function DoctorShareTransferModal({ show, handleClose }) {
  const [DoctorData, setDoctorData] = useState([]);

  const [state, setState] = useState({
    FromDoctorID: "",
    ToDoctorID: "",
  });
  const handleSelectChange = (event) => {
    const { name, value } = event?.target;
    if (name == "FromDoctorID") {
      setState({
        ...state,
        [name]: String(value),
        ToDoctorID:
          value == state?.ToDoctorID ? "" : state?.ToDoctorID,
      });
    } else
      setState({
        ...state,
        [name]: String(value),
      });
  };
  console.log(DoctorData, state);
  const postApi = () => {
    if (state?.FromDoctorID && state?.ToDoctorID) {
      axios
        .post("/api/v1/DocShareMaster/transferDocShare", {
          FromDoctorID: state?.FromDoctorID,
          ToDoctorID: state?.ToDoctorID,
        })
        .then((res) => {
          toast.success(res?.data?.message);
          setState({
            FromDoctorID: "",
            ToDoctorID: "",
          });
        })
        .catch((err) => {
          toast.error(
            err?.response?.data?.message
              ? err?.response?.data?.message
              : "SomeThing Went Wrong"
          );
        });
    } else {
      toast.error("Please Choose FromDoctorID and ToDoctorID");
    }
  };

  const BindDoctorData = () => {
    axios
      .post("/api/v1/DoctorReferal/getDoctorDataBind")
      .then((res) => {
        const data = res?.data?.message;
        const val = data?.map((ele) => {
          return {
            label: ele?.DoctorName,
            value: ele?.DoctorID,
          };
        });
        setDoctorData(val);
      })
      .catch((err) => {
        toast.error(
          err?.data?.message ? err?.data?.message : "SomeThing Went Wrong"
        );
      });
  };

  useEffect(() => {
    BindDoctorData();
  }, []);
  return (
    <Modal show={show}>
      <Modal.Header className="modal-header">
        <Modal.Title className="modal-title">Doctor Share Transfer</Modal.Title>
        <button type="button" className="close" onClick={handleClose}>
          ×
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box-body">
          <div className="row">
            <div className="col-sm-6">
              <label>From Doctor</label>
              <SelectBox
                options={[
                  { label: "Select From Doctor", value: "" },
                  ...DoctorData,
                ]}
                onChange={handleSelectChange}
                name={"FromDoctorID"}
                selectedValue={state?.FromDoctorID}
                className="required"
              />
            </div>
            <div className="col-sm-6">
              <label>To Doctor</label>
              <SelectBox
                options={[
                  { label: "Select To Doctor", value: "" },
                  ...(state?.FromDoctorID
                    ? DoctorData.filter(
                        (ele) => ele.value != state?.FromDoctorID
                      )
                    : DoctorData),
                ]}
                onChange={handleSelectChange}
                name={"ToDoctorID"}
                selectedValue={state?.ToDoctorID}
                className="required"
              />
            </div>
          </div>
        </div>
        <div className="box-footer">
          <div className="row">
            <div className="col-sm-2">
              <button
                className="btn btn-block btn-success btn-sm"
                onClick={postApi}
              >
                Save
              </button>
            </div>
            <div className="col-sm-2">
              <button
                className="btn btn-block btn-danger btn-sm"
                onClick={handleClose}
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

export default DoctorShareTransferModal;
