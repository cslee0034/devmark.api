import React, { FC } from "react";

interface P {
  header: string;
  message: string;
  toggle: any;
}

const Modal: FC<P> = (props: P): JSX.Element => {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-head-container">
          <div className="modal-header">{props.header}</div>

          <button
            className="modal-button"
            onClick={() => props.toggle((prev: string) => "")}
          >
            X
          </button>
        </div>

        <hr className="sidebar-divider my-0 mt-3 mb-5" />

        <div className="modal-main">{props.message}</div>
      </div>
    </div>
  );
};

export default Modal;
