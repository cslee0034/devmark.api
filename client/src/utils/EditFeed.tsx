import React, { FC, useContext, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios, { AxiosResponse } from "axios";
import { ModalContext } from "../App";

// Interfaces
interface Post {
  Error: any;
  box: string;
  url: string;
}
interface P {}

// React Start from here
const EditFeed: FC<P> = (props: P): JSX.Element => {
  //--------------------------------------------------------
  // Declaration of useState, useContext, useRef ...
  const { setModalContent } = useContext(ModalContext);

  //--------------------------------------------------------
  // Event Handler

  /* <Event Handler> - Memo Create*/
  const feedCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* Feed URL Check */
    if (!(e.target as HTMLFormElement).URL.value) {
      // 피드 URL이 없는 경우
      setModalContent({
        header: "Feed URL",
        message: "You must enter feed URL",
        toggle: "view",
      });
      return;
    }
    /* Feed Name Check */
    if (!(e.target as HTMLFormElement).Title.value) {
      // 피드 이름이 없는 경우
      setModalContent({
        header: "Feed Name",
        message: "You must enter feed name",
        toggle: "view",
      });
      return;
    }
    if ((e.target as HTMLFormElement).Title.value.length > 15) {
      // 피드 이름이 15글자 이상인 경우
      setModalContent({
        header: "Feed Name",
        message: "the maximum number of characters for a feed name is 15",
        toggle: "view",
      });
      return;
    }

    /* Feed Content Check */
    if (!(e.target as HTMLFormElement).Text.value) {
      // 내용이 없는 경우
      setModalContent({
        header: "Feed Content",
        message: "You must enter memo content",
        toggle: "view",
      });
      return;
    }
    if ((e.target as HTMLFormElement).Text.value.length > 200) {
      // 내용이 200자가 넘는 경우
      setModalContent({
        header: "Feed Content",
        message: "the maximum number of characters for a feed content is 200",
        toggle: "view",
      });
      return;
    }

    /* createMemo Axios */
    createFeed(e);

    /* Reload */
    window.location.replace(`/feeds`);
  };

  //--------------------------------------------------------
  // Axios Request

  /* <Axios Request> - Memo Axios Post /api/memo */
  const createFeed = async (e: any) => {
    try {
      await axios.post<Post>("/api/feed", {
        options: e.target[0].value, // URL
        feedName: e.target[1].value,
        feedContent: e.target[2].value,
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
      <form className="edit-form" onSubmit={feedCreate}>
        <input
          className="form-control"
          id="URL"
          type="text"
          placeholder="URL"
        ></input>
        <input className="form-control" id="Title" placeholder="Title"></input>

        <textarea
          className="form-control"
          id="Text"
          placeholder="Content (200)"
        ></textarea>
        <button type="submit" className="login-button mt-2 mb-4">
          Edit
        </button>
      </form>
    </>
  );
};

export default EditFeed;
