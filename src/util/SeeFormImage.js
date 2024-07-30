import React from "react";
import { Modal } from "react-bootstrap";

function SeeFormImage({ show, handleShow, data, pageName }) {
  return (
    <Modal
      show={show}
      id={pageName !== "" ? pageName : "concentformmodal"}
      size="sm"
    >
      <Modal.Header className="modal-header">
        <Modal.Title className="modal-title">
          {pageName ?? "Concent Form"}
        </Modal.Title>
        <button type="button" className="close" onClick={handleShow}>
          ×
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box-body">
          <div className="row">
            <div>
              <img style={{ width: "100%" }} src={data} className="img-fluid" />
            </div>
          </div>
        </div>
        <div className="box-footer">
          <div className="row">
            <div className="col-sm-3">
              <button
                type="button"
                className="btn btn-block btn-danger btn-sm"
                onClick={handleShow}
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

export default SeeFormImage;
