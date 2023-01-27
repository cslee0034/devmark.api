import axios, { AxiosResponse } from "axios";
import React, { FC, useContext, useState } from "react";
import { ModalContext } from "../App";

interface Post {
  Error: any;
  file: any;
  box: string;
  url: string;
}

interface P {
  header: string;
  message: string;
  toggle: any;
  id: string;
}

const CModal: FC<P> = (props: P): JSX.Element => {
  const { setModalContent } = useContext(ModalContext);
  const [file, setFile] = useState<File>();

  /* Bookmark Create */
  const BookmarkCreate = async (e: any) => {
    e.preventDefault();

    /* Bookmark Name Check */
    if (!e.target.BookmarkName.value) {
      setModalContent({
        header: "Bookmark Name",
        message: "You must enter bookmark name",
        toggle: "view",
      });
      return;
    }
    if (e.target.BookmarkName.value.length > 15) {
      setModalContent({
        header: "Bookmark Name",
        message: "the maximum number of characters for a bookmark is 15",
        toggle: "view",
      });
      return;
    }

    /* Bookmark URL Check */
    if (!e.target.BookmarkURL.value) {
      setModalContent({
        header: "Bookmark URL",
        message: "You must enter bookmark URL",
        toggle: "view",
      });
      return;
    }

    /* Create Bookmark */
    createBookmark(e, props.id);

    /* Reload */
    window.location.reload();
  };

  /* Create Bookmark */
  const createBookmark = async (e: any, boxId: string) => {
    try {
      await axios
        .post<Post>("/api/content", {
          bookmarkName: e.target.BookmarkName.value,
          bookmarkURL: e.target.BookmarkURL.value,
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

  /* Box Edit */
  const BoxCreate = async (e: any) => {
    e.preventDefault();

    if (e.target.Box.value.length > 15) {
      setModalContent({
        header: "Box Name",
        message: "the maximum number of characters for a bookmark box is 15",
        toggle: "view",
      });
      return;
    }

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
    await uploadImg(e, formData, config);

    /* Create Box */
    await createBox(e, imageURL);

    /* Reload */
    window.location.reload();
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

  /* Create Box */
  const createBox = async (e: any, imgURL: string) => {
    try {
      await axios
        .post<Post>("/api/box/", {
          box: e.target.Box.value,
          url: imgURL,
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
    if (props.header === "Edit_Box") {
      return (
        <form className="edit-box" onSubmit={BoxCreate}>
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
            Edit
          </button>
        </form>
      );
    } else if (props.header === "Edit_Bookmark") {
      return (
        <form className="edit-box" onSubmit={BookmarkCreate}>
          <input
            type="text"
            className="form-control"
            id="BookmarkName"
            placeholder="Bookmark Name"
          />
          <input
            type="text"
            className="form-control"
            id="BookmarkURL"
            placeholder="URL"
          />
          <button type="submit" className="login-button">
            Edit
          </button>
        </form>
      );
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

export default CModal;
