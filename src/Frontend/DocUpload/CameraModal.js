import React, { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

function CameraModal({ show, handleClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (show) {
      startWebcam();
    } else {
      stopWebcam();
    }
  }, [show]);

  const startWebcam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.error("Error accessing webcam: ", err);
        toast.error("Could not access webcam.");
      });
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleCloseModal = () => {
    stopWebcam();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header>
        <Modal.Title>Scanner</Modal.Title>
        <button type="button" className="close" onClick={handleCloseModal}>
          ×
        </button>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <video ref={videoRef} style={{ width: "400px" }}></video>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CameraModal;
