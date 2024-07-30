import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import axios from "axios";

const SimpleUploadModal = ({
  show,
  handleClose,
  data,
  documentId,
  pageName,
  documentName,
  fileName,
}) => {
  const [load, setLoad] = useState(false);
  const { t } = useTranslation();
  const [isAvailable, setIsAvailabel] = useState(false);
  const [datas, setDatas] = useState(null);

  useEffect(() => {
    Fetch();
  }, []);

  if (!documentId || !pageName) {
    toast.error("Missing Dependency");
    return () => handleClose();
  }
  const Fetch = () => {
    axios
      .post("/api/v1/CommonController/GetDocument", {
        Page: pageName,
        Guid: documentId,
      })
      .then((res) => {
        if (res.data.message.length > 0) {
          setDatas(res.data.message[0]);
          setIsAvailabel(true);
        } else {
          setIsAvailabel(false);
        }
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : t("Something Went Wrong")
        );
      });
  };

  const handleUpload = async (e) => {
    if (!document.getElementById("file").files[0]) {
      toast.error("Please Attach file first ");
    } else {
      setLoad(true);
      e.preventDefault();
      let formData = new FormData();
      formData.append("file", document.getElementById("file").files[0]);
      formData.append("DocumentID", documentId);
      formData.append("Page", pageName);
      formData.append("DocumentName", documentName ?? "");
      formData.append("Guid", documentId ?? "");
      formData.append("FileName", fileName ?? "");

      await axios
        .post("/api/v1/CommonController/UploadDocument", formData)
        .then((res) => {
          toast.success(res?.data?.message);
          setLoad(false);
          handleClose(res?.data?.data);
        })
        .catch((err) => {
          setLoad(false);
          toast.error(
            err?.response?.data?.message
              ? err?.response?.data?.message
              : t("Something Went Wrong")
          );
        });
    }
    document.getElementById("file").value = "";
  };

  const DeleteImage = () => {
    axios
      .post("/api/v1/CommonController/InActiveDocument", {
        Hash_Id: datas?.ID_Hash,
      })
      .then((res) => {
        toast.success(res?.data?.message);
        Fetch();
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : t("Something Went Wrong")
        );
      });
  };

  return (
    <Modal
      {...{ show, handleClose }}
      size="md"
      centered
      style={{ background: "black" }}
    >
      <Modal.Header className="modal-header">
        <Modal.Title className="modal-title">
          {t("Upload Document")}
        </Modal.Title>
        <button type="button" className="close" onClick={handleClose}>
          ×
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="row">&nbsp;</div>
        {isAvailable ? (
          <div className="row">
            <label className="col-sm-9">File Already Uploaded</label>
            <div className="col-sm-2">
              <button
                type="button"
                className="btn btn-danger btn-success btn-sm"
                id="btnSave"
                onClick={() => DeleteImage()}
              >
                {t("Remove To ReUpload")}
              </button>
            </div>
          </div>
        ) : (
          <div className="row">
            <label className="col-sm-2">Select File</label>
            <div className="col-sm-6">
              <input type="file" id="file" name="file" />
            </div>
            <div className="col-sm-2">
              {load ? (
                <Loading />
              ) : (
                <button
                  type="button"
                  className="btn btn-block btn-success btn-sm"
                  id="btnSave"
                  onClick={handleUpload}
                >
                  {t("Upload")}
                </button>
              )}
            </div>
            <div className="col-sm-2">
              <button
                type="button"
                className="btn btn-block btn-danger btn-sm"
                id="btnSave"
                onClick={handleClose}
              >
                {t("Close")}
              </button>
            </div>
          </div>
        )}
      </Modal.Body>
      ;
    </Modal>
  );
};

export default SimpleUploadModal;
