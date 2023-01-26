import axios, { AxiosResponse } from "axios";
import React, { FC, useContext, useState } from "react";
import { idText } from "typescript";
import { ModalContext } from "../App";

interface Post {
  Error: any;
  file: any;
  box: string;
  url: string;
}

interface P {
  header: string;
  toggle: any;
  url: string;
  id: string;
}

const UModal: FC<P> = (props: P): JSX.Element => {
  const { setModalContent } = useContext(ModalContext);
  const [file, setFile] = useState<File>();

  /* Box Edit */
  const BoxUpdate = async (e: any) => {
    e.preventDefault();
    console.log(props.url);

    /* FormData */
    const formData = new FormData();
    if (file !== undefined) {
      formData.append("img", file);
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    /* Image Upload */
    if (file !== undefined) {
      await uploadImg(e, formData, config);
      await updateBox(e, imageURL, props.id, props.url);
    } else {
      await updateBox(e, props.url, props.id, "");
    }

    // /* Create Box */

    window.location.replace("/bookmark");
  };

  /* Image Upload */
  let imageURL = "";
  const uploadImg = async (e: any, formData: FormData, config: object) => {
    try {
      await axios.post<Post>("/api/box/img", formData, config).then((res) => {
        imageURL = res.data.url;
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

  /* Update Box */
  const updateBox = async (
    e: any,
    imgURL: string,
    boxId: string,
    deleteImgUrl: string
  ) => {
    try {
      await axios
        .post<Post>("/api/box/update", {
          box: e.target.Box.value,
          url: imgURL,
          id: boxId,
          d_url: deleteImgUrl,
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

  /* Handle Image File */
  const fileChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];
    setFile(files);
  };

  // -------------------------------------------------------------------------

  /* Handle Main Content */
  const modalMain = () => {
    if (props.header === "Modify_Box") {
      return (
        <form className="edit-box" onSubmit={BoxUpdate}>
          <input
            type="file"
            className="img-upload mb-3"
            accept="image/*"
            onChange={fileChangedHandler}
          ></input>
          <input
            type="text"
            className="form-control"
            id="Box"
            placeholder="Box Name"
          />
          <button type="submit" className="login-button">
            Modify
          </button>
        </form>
      );
    } else {
      return <div className="modal-main"></div>;
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
        {modalMain()}
      </div>
    </div>
  );
};

export default UModal;
