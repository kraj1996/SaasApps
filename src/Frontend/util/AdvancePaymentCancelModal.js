import Modal from "react-bootstrap/Modal";
function AdvancePaymentCancelModal({
  show,
  handleChange,
  onhide,
  handleCancel,
}) {
  return (
    <Modal show={show?.modalShow} size="md" centered>
      <Modal.Header>
        <button
          className="fa fa-close"
          style={{ backgroundColor: "red", color: "white" }}
          onClick={onhide}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <div className="box-body">
          <div className="row">
            <div className="col-12">
              <label>Enter Comment</label>
              <input
                className="form-control"
                placeholder="enter Comment to Cancel"
                value={show?.cancelReason}
                name="cancelReason"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="box-footer">
          <div className="row">
            <div className="col-sm-2">
              <button
                className="btn btn-block btn-success btn-sm"
                onClick={handleCancel}
              >
                {"Update"}
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AdvancePaymentCancelModal;
