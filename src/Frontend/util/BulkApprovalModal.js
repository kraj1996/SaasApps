import React from "react";
import { Modal } from "react-bootstrap";

function BulkApprovalModal({ show, onHide, data }) {
  console.log(data);
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
        <div
          className="box-body divResult boottable table-responsive"
          id="no-more-tables"
        >
          <table
            className="table table-bordered table-hover table-striped tbRecord"
            cellPadding="{0}"
            cellSpacing="{0}"
          >
            <thead className="cf">
              <tr>
                <th>S.No.</th>
                <th>LabObservationName</th>
                <th>DisplayReading</th>
                <th>ReadingFormat</th>
                <th>Value</th>
                {/* <th >{data[0]?.renderData[0]?.date}</th> */}
              </tr>
            </thead>
            <tbody>
              {data?.map((ele, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{ele?.LabObservationName}</td>
                  <td>{ele?.DisplayReading}</td>
                  <td>{ele?.ReadingFormat}</td>
                  <td >{ele?.renderData[0]?.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="box-footer">
          <div className="row">
            <div className="col-sm-2">
              <button
                className="btn btn-block btn-danger btn-sm"
                onClick={onHide}
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

export default BulkApprovalModal;
