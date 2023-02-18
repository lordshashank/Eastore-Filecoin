import classes from "../../styles/Modal.module.css";
import React from "react";

const Modal = (props) => {
  const closeHandler = (e) => {
    if (e.target.id == "modal") {
      props.onClose();
    }
  };
  return (
    <div className={classes.backdrop} id="modal" onClick={closeHandler}>
      <div className={classes.modal}>{props.children}</div>
    </div>
  );
};
export default Modal;
