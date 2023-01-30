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

    /* Reload */
    window.location.reload();
  };

  const contentDelete = (e: any) => {
    e.preventDefault();

    /* Delete Box */
    deleteContent(props.id);

    /* Reload */
    window.location.reload();
  };

  /* Delete Box */
  const deleteBox = async (imgUrl: string, boxId: string) => {
    try {
      await axios
        .delete<Delete>("/api/box", {
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

  /* Delete Content */
  const deleteContent = async (contentId: string) => {
    try {
      await axios
        .delete<Delete>("/api/content", {
          data: {
            id: contentId,
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

  const DeleteButton = () => {
    if(props.header === "Delete_Box") {
      return <button onClick={boxDelete}>Yes</button>
    }
    if(props.header === "Delete_Content") {
      return <button onClick={contentDelete}>Yes</button>
    }
  }
  return (
    <>
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
            {DeleteButton()}
          </div>
          ;
        </div>
      </div>
    </>
  );
};

export default DModal;
