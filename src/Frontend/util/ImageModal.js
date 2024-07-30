import React from "react";
import { Modal } from "react-bootstrap";

const ImageModal = ({ imageUrl, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <img src={imageUrl} alt="Modal Content" />
      <button onClick={onClose}>Close Modal</button>
    </Modal>
  );
};

export default ImageModal;
