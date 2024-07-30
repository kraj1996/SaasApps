import React from "react";
import { Modal } from "react-bootstrap";
import { useState } from "react";
function SampleRemark({ show, handleShow, state, PageName, handleSave ,title}) {
  const [payload, setPayload] = useState(PageName);
  console.log(state);
  return (
    <Modal show={show}>
      <Modal.Header className="modal-header">
        <Modal.Title className="modal-title">{title}</Modal.Title>
        <button type="button" className="close" onClick={handleShow}>
          ×
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body">
          <div className="box-body">
            <div className="row">
              <div className="col-12">
                {<textarea
                  rows={6}
                  className="form-control"
                  name="CustomReason"
                  onChange={(e) => {
                    setPayload(e?.target?.value);
                  }}
                  value={payload}
                  disabled={title === "Remarks" || title === "PricksRemarks"}
                ></textarea>}
              </div>
            </div>
          </div>
          <div className="box-footer">
          {title == "Remarks" || title =="PricksRemarks" ? (
        <></>
      ) : (
        <div className="row">
          <div className="col-sm-2">
            <button
              type="button"
              className="btn btn-block btn-success btn-sm"
              onClick={() => {
                handleSave(payload, state?.index, state?.SINNo);
              }}
            >
              Save
            </button>
          </div>
          <div className="col-sm-2">
            <button
              type="button"
              className="btn btn-block btn-danger btn-sm"
              onClick={handleShow}
            >
              Close
            </button>
          </div>
        </div>
      )}
            
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SampleRemark;
