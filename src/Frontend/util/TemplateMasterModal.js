import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import TextEditor from "../../Frontend/Master/Report/TextEditor";

function TemplateMasterModal({ show, handleClose, handleSave }) {
  const [payload, setPayload] = useState(show?.data);
  const [Editor, setEditor] = useState("");
  const [TemplateDropdown, setTemplateDropDown] = useState([]);
  const [EditTable, setEditTable] = useState(false);

  const isCommentEmpty = Editor.trim() === "";

  useEffect(() => {
    setPayload({ ...payload, COMMENT: Editor });
  }, [Editor]);

  const handleSaveClick = () => {
    if (isCommentEmpty) {
      toast.error("Please fill the mandatory field");
    } else {
      handleSave(payload, "TemplateMaster");
    }
  };

  

  const fetch = () => {
    axios
      .post("/api/v1/InvestigationCommentMaster/getInvestigationCommentData", {
        InvestigationID: show?.data?.labObservationID,
        Template: "",
        TemplateText: "",
      })
      .then((res) => {
        const data = res?.data?.message;
        const val = data?.map((ele) => {
          return {
            ...ele,
            value: ele?.CommentID,
            label: ele?.Template,
          };
        });
        setTemplateDropDown(val);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Error Occured"
        );
      });
  };

  const FetchTemplateID = (id) => {
    setEditTable(true);
    axios
      .post("api/v1/RE/BindReportTemplateByID", {
        ReportTypeID: id,
        InvestigationID: payload?.InvestigationID,
      })
      .then((res) => {
        setPayload({
          ...payload,
          COMMENT: res?.data?.message[0]?.TemplateText,
        });
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Error Occured"
        );
      });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const data = TemplateDropdown.find((ele) => ele.value == value);
    console.log(data);
    setEditTable(true);
    setPayload({
      ...payload,
      CommentID: parseInt(value),
      COMMENT: data?.TemplateText,
    });
  };

  // useEffect(() => {
  //   if (payload?.COMMENT) {
  //     handleSave();
  //   } else {
  //     toast.error("Please fill  field");
  //   }
  // }, []);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Modal show={show?.modal} size="lg">
      <Modal.Header className="modal-header">
        <Modal.Title className="modal-title" />

        <button type="button" className="close" onClick={handleClose}>
          ×
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box-body">
          <div className="row">
            <div className="col-12">
              <select
                className="select-input-box form-control input-sm"
                onChange={handleChange}
                value={payload?.CommentID}
              >
                <option hidden>Select Template</option>
                {TemplateDropdown?.map((data, index) => (
                  <option value={data?.value} key={index}>
                    {data?.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12">
              <TextEditor
                name="COMMENT"
                value={payload?.COMMENT}
                setValue={setEditor}
                EditTable={EditTable}
                setEditTable={setEditTable}
              />
            </div>
          </div>
        </div>
        <div className="box-footer">
          <div className="row">
            <div className="col-sm-1">
              <button
                type="button"
                className="btn btn-success btn-sm mx-2"
                onClick={handleSaveClick}
              >
                Save
              </button>
            </div>
            <div className="col-sm-1">
              <button
                type="button"
                className="btn btn-danger btn-sm"
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

export default TemplateMasterModal;
