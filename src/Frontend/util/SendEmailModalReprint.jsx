import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../../ChildComponents/Input";
import { ReportEmailValidation } from "../../ChildComponents/validations";

function SendEmailModalReprint({ show, data, handleClose }) {
  let RADIO_BUTTON;

if (data?.Status === 5||data?.Status===6) {
 RADIO_BUTTON = [
    {
      label: "Bill Receipt",
      value: "1",
    },
    {
      label: "Lab Report",
      value: "2",
    },
  ];
} else {
  RADIO_BUTTON = [
    {
      label: "Bill Receipt",
      value: "1",
    },
    
  ];
}
  const [formdata,setFormdata]=useState({
    To: "",
    CC: "",
    BCC: "",
    URL: "",
  });
  const [err, setErr] = useState({});
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   const handlechangeForm=(e)=>{
    const { name, value } = e.target;
    setFormdata({...formdata,[name]:value})
   }

  
  const[radio,setRadio]=useState('Bill Receipt');
  const handleChange=(e)=>{
     const {name,value}=e?.target;
     if(value=='2')
     {
       getReport()
     }
     else if(value=='1')
     {
      getReceipt()
     }
  setRadio(radio=='Bill Receipt'?'Lab Report':'Bill Receipt')
    
}

  const getReport = () => {
    axios.post('/reports/v1/commonReports/GetLabReport', {
        PHead: 1,
        TestIDHash: data?.TestIdHash,
      })
      .then((res) => {
        setFormdata({ ...formdata, URL: res?.data?.Url });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sendEmail = () => {
    const generatedError = ReportEmailValidation(formdata);
    if (generatedError == "") {
      const payload = {
        ReportType: radio == "Bill Receipt" ? 1 : 2,
        Url: formdata?.URL,
        Email: formdata?.To,
        EmailCC: formdata?.CC,
        EmailBCC: formdata?.BCC,
        LedgerTransactionId: data?.LedgerTransactionID,
      };
      axios
        .post("api/v1/Lab/SendEmail", payload)
        .then((res) => {
          toast.success(res?.data?.message);
          handleClose();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    } else {
      setErr(generatedError);
    }
  };

  const getReceipt = () => {
    
    axios
      .post("/reports/v1/getReceipt", {
        LedgerTransactionIDHash: data?.LedgertransactionIDHash,
      })
      .then((res) => {
        setFormdata({ ...formdata, URL: res?.data?.Url });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getReceipt();
  }, []);
  return (
    <Modal show={show}>
      <Modal.Header className="modal-header">
        <Modal.Title className="modal-title" />

        <button type="button" className="close" onClick={handleClose}>
          ×
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box-body">
          <div className="row">
            {RADIO_BUTTON.map((ele, index) => (
              <div className="col-sm-4" key={index}>
              <div className="col-sm-6">
                <label htmlFor={ele?.label}>{ele?.label}</label>
                </div>
                <div className="col-sm-2">
                <input
                  type="radio"
                  id={ele?.label}
                  name="type"
                  checked={radio==ele?.label}
                  onChange={handleChange}
                  value={ele?.value}
                />
                </div>
                
              </div>
            ))}
          </div>

          <div className="row">
            <label className="col-sm-4">To:</label>
            <div className="col-sm-8">
              <Input
                className="select-input-box form-control input-sm "
                name="To"
                value={formdata?.To}
                type="text"
                onChange={handlechangeForm}
              />
              {
                !emailRegex.test(formdata?.To) && (
                  <span className="golbal-Error">{err?.To}</span>
                )}
            </div>
          </div>
          <div className="row">
            <label className="col-sm-4">CC:</label>
            <div className="col-sm-8">
              <Input
                className="select-input-box form-control input-sm "
                type="text"
                name="CC"
                value={formdata?.CC}
                onChange={handlechangeForm}
              />
              {formdata?.CC.trim().length > 0 &&
                !emailRegex.test(formdata?.CC) && (
                  <span className="golbal-Error">{err?.CC}</span>
                )}
            </div>
          </div>
          <div className="row">
            <label className="col-sm-4">BCC:</label>
            <div className="col-sm-8">
              <Input
                className="select-input-box form-control input-sm "
                name="BCC"
                type="text"
                value={formdata?.BCC}
                onChange={handlechangeForm}
              />
              {formdata?.BCC.trim().length > 0 &&
                !emailRegex.test(formdata?.BCC) && (
                  <span className="golbal-Error">{err?.BCC}</span>
                )}
            </div>
          </div>
        </div>
        <div className="box-footer">
          <div className="row">
            <div className="col-sm-2">
              <button
                type="button"
                className="btn btn-block btn-danger btn-sm"
                onClick={handleClose}
              >
                Close
              </button>
            </div>

            <div className="col-sm-2">
              <button
                type="button"
                className="btn btn-block btn-success btn-sm"
                disabled={!formdata?.URL}
                onClick={sendEmail}
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SendEmailModalReprint;
