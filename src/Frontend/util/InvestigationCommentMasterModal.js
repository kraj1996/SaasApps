import React from "react";
import { Modal } from "react-bootstrap";
function InvestigationCommentMasterModal({ show, handleShow }) {
  return (
    <Modal
      show={show?.modalShow}
      centered
      size="lg"
      className="form-horizontal"
    >
      <Modal.Header className="modal-header">
        <Modal.Title className="modal-title">
          Investigation Comments
        </Modal.Title>
        <button type="button" className="close" onClick={handleShow}>
          ×
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body">
          <div className="box-body">
            <div className="row">
              <div className="col-12">{show?.data}</div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default InvestigationCommentMasterModal;
