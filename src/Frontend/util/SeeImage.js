import React from "react";
import { Modal } from "react-bootstrap";

function SeeImage({ show, handleShow, data }) {
   
  return (
    <Modal show={show}>
      <Modal.Header className="modal-header">
        <Modal.Title className="modal-title" />

        <button type="button" className="close" onClick={handleShow}>
          ×
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box-body">
          <div className="row">
            <div className="col-sm-12">
              <img src={data} className="img-fluid" />
            </div>
          </div>
        </div>
        <div className="box-footer">
          <div className="row">
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
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SeeImage;
