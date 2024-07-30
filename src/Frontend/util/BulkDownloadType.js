import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Input from "../../ChildComponents/Input";

function BulkDownloadType({ show, onHide, onSubmit }) {
  const [dataForEmail, setDataForEmail] = useState({
    letterHead: 0,
    Signature: 0,
  });

  return (
    <Modal show={show}>
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
                  [e.target.name]: e.target.checked?1:0,
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
                  [e.target.name]: e.target.checked?1:0,
                });
              }}
            />
          </div>
        </div>

        <div className="row">
          <button
            className="btn btn-sm btn-success mx-2"
            onClick={() => onSubmit(dataForEmail)}
          >
            Download
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default BulkDownloadType;
