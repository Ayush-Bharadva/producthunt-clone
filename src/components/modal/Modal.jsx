import { PropTypes } from 'prop-types';
import "./Modal.scss";
import { createPortal } from 'react-dom';
import { IoClose } from "react-icons/io5";

const Modal = ({ children }) => {
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <button type="button" className="close-btn">
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
  children: PropTypes.node.isRequired
}