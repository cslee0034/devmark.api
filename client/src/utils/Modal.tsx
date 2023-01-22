import React, { FC, useContext } from "react";
import { UserContext } from "../App";

interface P {
  header: string;
  message: string;
  toggle: any;
}

const Modal: FC<P> = (props: P): JSX.Element => {
  const { setModalContent } = useContext(UserContext);
  
  return (
    <div className="modal-container-background">
      <div className="modal-container">
        <div className="modal-head-container">
          <div className="modal-header">{props.header}</div>

          <button
            className="modal-button"
            onClick={() => setModalContent({
              header: "",
              message: "",
              toggle: ""
            })}
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
