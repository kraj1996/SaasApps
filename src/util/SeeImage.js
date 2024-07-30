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
        <img src={data} className="img-fluid" />
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="close" onClick={handleShow}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default SeeImage;
