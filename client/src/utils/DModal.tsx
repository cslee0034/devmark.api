import axios, { AxiosResponse } from "axios";
import React, { FC, useContext } from "react";
import { ModalContext } from "../App";

interface Delete {
  Error: any;
  boxId: string;
}

interface P {
  header: string;
  message: string;
  toggle: any;
  url: string;
  id: string;
}

const DModal: FC<P> = (props: P): JSX.Element => {
  const { setModalContent } = useContext(ModalContext);

  const boxDelete = (e: any) => {
    e.preventDefault();

    /* Delete Box */
    deleteBox(props.url, props.id);

    /* Redirect */
    window.location.replace("/bookmark");
  };

  /* Delete Box */
  const deleteBox = async (imgUrl: string, boxId: string) => {
    try {
      await axios
        .delete<Delete>("/api/box/delete", {
          data: {
            d_url: imgUrl,
            id: boxId,
          },
        })
        .then((res) => {
          if (res.data.Error) {
            setModalContent({
              header: "Edit ERROR",
              message: res.data.Error,
              toggle: "view",
            });
          }
        });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          (error.response as AxiosResponse<{ message: string }>)?.data.message
        );
      } else {
        console.error(error);
      }
    }
  };
  return (
    <div className="modal-container-background">
      <div className="modal-container">
        <div className="modal-head-container">
          <div className="modal-header">{props.header}</div>

          <button
            className="modal-button"
            onClick={() =>
              setModalContent({
                header: "",
                message: "",
                toggle: "",
              })
            }
          >
            X
          </button>
        </div>
        <hr className="sidebar-divider my-0 mt-3 mb-5" />
        <div className="modal-main">
          Are you sure to delete? &nbsp;
          <button onClick={boxDelete}>Yes</button>
        </div>
        ;
      </div>
    </div>
  );
};

export default DModal;
