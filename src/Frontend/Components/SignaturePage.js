import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { FaTrashAlt } from "react-icons/fa";
import { TiTickOutline } from "react-icons/ti";
import { GrPowerReset } from "react-icons/gr";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

const SignaturePage = ({ show, onHide, data }) => {
  const [img, setImg] = useState(null);
  const [preData, setPreData] = useState(data);

  const signatureRef = useRef({});

  const clear = () => {
    if (preData == "") {
      signatureRef.current.clear();
      onHide(null);
    } else {
      setImg(null);
      onHide({ data: null, filled: false });
      setPreData(null);
    }
  };
  const save = () => {
    if (!signatureRef.current.isEmpty()) {
      const sign = signatureRef.current.toDataURL();
      setImg(sign);
      setPreData(sign);
      onHide({ data: sign, filled: true });
    } else {
      toast.error("Please provide a signature before saving.");
    }
  };

  const resign = () => {
    setPreData(null);
  };
  console.log(img)

  return (
    <Modal {...{ show, onHide, backdrop: "static" }} size="lg" centered>
      <Modal.Body>
        <div className="sign-Container">
          <div className="sign-canvas">
            {preData ? (
              <img src={preData} />
            ) : (
              <SignatureCanvas
                ref={signatureRef}
                canvasProps={{
                  width: 400,
                  height: 500,
                  className: "signature-canvas",
                }}
              />
            )}
          </div>
          <div className="sign-buttons-moadal" style={{ display: "flex" }}>
            <button
              className="form-control btn btn-danger text-white m-1"
              onClick={() => clear()}
            >
              Delete <FaTrashAlt />
            </button>
            {preData ? (
              <button
                className="form-control btn btn-success text-white m-1"
                onClick={() => resign()}
              >
                Resign <GrPowerReset />
              </button>
            ) : (
              <button
                className="form-control btn btn-success text-white m-1"
                onClick={() => save()}
              >
                Save <TiTickOutline />
              </button>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignaturePage;
