import { PropTypes } from 'prop-types';
import "./Modal.scss";
import { createPortal } from 'react-dom';
import { IoClose } from "react-icons/io5";
import { useEffect } from 'react';

const Modal = ({ children, isOpenModal, closeModal }) => {

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpenModal])

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <button type="button" className="close-btn" onClick={closeModal}>
          <IoClose />
        </button>
        <div className="modal">{children}</div>
      </div>
    </div>,
    document.getElementById("modal")
  )
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}