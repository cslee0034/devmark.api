import React, { FC, useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios, { AxiosResponse } from "axios";
import { ModalContext } from "../../App";

// Interfaces
interface Post {
  Error: any;
  box: string;
  url: string;
}
interface P {
  type: string;
  category: string;
  bookmarkId: string;
  boxId: string;
}

// React Start from here
const EditMemo: FC<P> = (props: P): JSX.Element => {
  //--------------------------------------------------------
  // Declaration of useState, useContext, useRef ...
  const { setModalContent } = useContext(ModalContext);

  //--------------------------------------------------------
  // Event Handler

  /* <Event Handler> - Memo Create*/
  const handleCreateMemo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* Memo Name Check */
    if (!(e.target as HTMLFormElement).Title.value) {
      // 메모 이름이 없는 경우
      setModalContent({
        header: "Memo Name",
        message: "You must enter memo name",
        toggle: "view",
      });
      return;
    }
    if ((e.target as HTMLFormElement).Title.value.length > 15) {
      // 메모 이름이 15글자 이상인 경우
      setModalContent({
        header: "Memo Name",
        message: "the maximum number of characters for a memo is 15",
        toggle: "view",
      });
      return;
    }

    /* Memo Content Check */
    if (!(e.target as HTMLFormElement).Text.value) {
      // 내용이 없는 경우
      setModalContent({
        header: "Memo URL",
        message: "You must enter memo content",
        toggle: "view",
      });
      return;
    }

    /* createMemo Axios */
    createMemo(e);

    /* Reload */
    window.location.replace(`/bookmarks/${props.boxId}`);
  };

  //--------------------------------------------------------
  // Axios Request

  /* <Axios Request> - Memo Axios Post /api/memo */
  const createMemo = async (e: any) => {
    try {
      await axios.post<Post>("/api/memo", {
        memoName: e.target[1].value,
        memoContent: e.target[2].value,
        bookmarkId: props.bookmarkId,
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error(
          (error.response as AxiosResponse<{ message: string }>)?.data.message
        );
      } else {
        console.error(error);
      }
      if (error.response.data.Error) {
        setModalContent({
          header: "Edit ERROR",
          message: error.response.data.Error,
          toggle: "view",
        });
      }
    }
  };

  //--------------------------------------------------------
  // return

  return (
    <>
      <form className="edit-form" onSubmit={handleCreateMemo}>
        <input
          className="form-control"
          type="text"
          placeholder={`Category: #${props.category}`}
          aria-label="Disabled input example"
          disabled
        ></input>
        <input className="form-control" id="Title" placeholder="Title"></input>

        <textarea
          className="form-control"
          id="Text"
          placeholder="Content"
        ></textarea>
        <button type="submit" className="login-button mt-2 mb-4">
          Edit
        </button>
      </form>
    </>
  );
};

export default EditMemo;
