import moment from "moment";
import React, { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { getS3FileData, guidNumber } from "../Frontend/util/Commonservices";
import axios from "axios";
import Loading from "../Frontend/util/Loading";

function CameraModal({ show, guid, handleClose, pageName, defaultImage }) {
  const link =
    "https://elabassets.s3.ap-south-1.amazonaws.com/1/01147fad-c19a-4bc8-97a2-32ef8af0c9e0.png";
  const [imageSrc, setImageSrc] = useState(link);
  const [fileSrc, setFileSrc] = useState(null);
  const [guidNo, setGuidNo] = useState(guid);
  const [isCapturing, setIsCapturing] = useState(false);
  const [typeUpload, setTypeUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  console.log(guid);

  useEffect(() => {
    const fetchImage = async () => {
      console.log("Fetching image", guid);
      if (guid && guid !== "") {
        setLoading(true);
        let ImgData = await getS3FileData(guid, pageName ?? "EmployeeImage");
        if (ImgData[0]?.fileUrl && ImgData[0]?.fileUrl !== "") {
          setImageSrc(ImgData[0]?.fileUrl);
          setTypeUpload(true);
        } else {
          setTypeUpload(false);
          setImageSrc(link);
        }
      } else {
        setTypeUpload(false);
        const guidNum = guidNumber();
        setGuidNo(guidNum);
      }
      setLoading(false);
    };
    fetchImage();
  }, [guid]);

  const handleUploadClick = (event) => {
    stopWebcam();
    setIsCapturing(false);
    setImageSrc(null);
    setFileSrc(null);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
      setFileSrc(file);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  function base64ToFile(base64String, filename) {
    const [prefix, base64Data] = base64String.split(",");
    const mime = prefix.match(/:(.*?);/)[1];
    const byteString = atob(base64Data);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mime });
    return new File([blob], filename, { type: mime });
  }

  const handleCaptureClick = () => {
    setImageSrc(null);
    setFileSrc(null);
    setIsCapturing(true);
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: { exact: "environment" } },
      })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.error("Error accessing webcam: ", err);
        setIsCapturing(false);
      });
  };

  const handleCaptureImage = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    const dataUrl = canvasRef.current.toDataURL("image/png");
    setImageSrc(dataUrl);
    const fileName = base64ToFile(dataUrl, "file");
    setFileSrc(fileName);
    stopWebcam();
    setIsCapturing(false);
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleUpload = async () => {
    setLoading2(true);
    let formData = new FormData();
    formData.append("file", fileSrc);
    formData.append("DocumentID", pageName ?? "EmployeeImage");
    formData.append("Page", pageName ?? "EmployeeImage");
    formData.append("DocumentName", pageName ?? "EmployeeImage");
    formData.append("Guid", guidNo);
    formData.append("FileName", "Name");

    await axios
      .post("/api/v1/CommonController/UploadDocument", formData)
      .then((res) => {
        toast.success(res?.data?.message);
        handleClose(guidNo, imageSrc);
        stopWebcam();
        setLoading2(false);
      })
      .catch((err) => {
        setLoading2(false);
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Something Went Wrong"
        );
      });
  };

  const handleDelete = async () => {
    setLoading2(true);
    const imgUrldata = await getS3FileData(guid, pageName ?? "EmployeeImage");

    await axios
      .post("/api/v1/CommonController/InActiveDocument", {
        Hash_Id: imgUrldata[0]?.ID_Hash,
      })
      .then((res) => {
        toast.success(res?.data?.message);
        setTypeUpload(false);
        setImageSrc(link);
        setLoading2(false);
      })
      .catch((err) => {
        setLoading2(false);
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Something Went Wrong"
        );
      });
  };
  return (
    <Modal show={show}>
      <Modal.Header className="modal-header">
        <Modal.Title className="modal-title">Camera</Modal.Title>
        <button
          type="button"
          className="close"
          onClick={() => {
            setImageSrc(link);
            setFileSrc(null);
            setTypeUpload(false);
            setGuidNo("");
            handleClose(
              imageSrc !== link ? guid : "",
              imageSrc ?? defaultImage
            );
            stopWebcam();
          }}
        >
          x
        </button>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            minHeight: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div classname="row">
            {isCapturing && (
              <div
                className="col-sm-12 "
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <video ref={videoRef} style={{ width: "400px" }}></video>
                <br />
                <button
                  className="btn btn-block btn-info btn-sm"
                  onClick={handleCaptureImage}
                >
                  Take Photo
                </button>
              </div>
            )}

            {imageSrc && !isCapturing && (
              <div
                className="col-sm-12"
                style={{
                  height: "400px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {loading ? (
                  <Loading />
                ) : (
                  <img
                    src={imageSrc}
                    alt="Selected"
                    style={{
                      width: "400px",
                      height: "400px",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </div>
            )}

            <canvas
              ref={canvasRef}
              style={{ display: "none" }}
              width="400"
              height="300"
            ></canvas>
          </div>
          <br />
          {typeUpload ? (
            <div
              className="row d-flex"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <div className="col-sm-5">
                <button
                  className="btn btn-block btn-danger btn-sm"
                  onClick={() => handleDelete()}
                  type="submit"
                >
                  Remove Image to ReUpload
                </button>
              </div>
            </div>
          ) : (
            <div
              className="row d-flex"
              style={{ width: "100%", justifyContent: "center" }}
            >
              {loading2 ? (
                <Loading />
              ) : (
                <>
                  <div className="col-sm-3">
                    {link === imageSrc ? (
                      <button
                        className="btn btn-block btn-warning btn-sm"
                        onClick={handleCaptureClick}
                        type="submit"
                      >
                        Capture Image
                      </button>
                    ) : (
                      <button
                        className="btn btn-block btn-warning btn-sm"
                        onClick={handleCaptureClick}
                        type="submit"
                      >
                        Recapture
                      </button>
                    )}
                  </div>
                  <div className="col-sm-3">
                    <button
                      className="btn btn-block btn-primary btn-sm"
                      onClick={() =>
                        document.getElementById("upload-input").click()
                      }
                    >
                      Upload Image
                    </button>
                    <input
                      id="upload-input"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleUploadClick}
                    />
                  </div>
                  {link !== imageSrc && (
                    <div className="col-sm-3">
                      <button
                        className="btn btn-block btn-success btn-sm"
                        onClick={handleUpload}
                        type="submit"
                      >
                        Save Image
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CameraModal;
