import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
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
interface P {
  type: string;
  category: string;
  bookmarkId: string;
  boxId: string;
}

// React Start from here
const Edit: FC<P> = (props: P): JSX.Element => {
  //--------------------------------------------------------
  // Declaration of useState, useContext, useRef ...
  const { setModalContent } = useContext(ModalContext);

  //--------------------------------------------------------
  // Event Handler

  /* <Event Handler> - Memo Create*/
  const memoCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    /* Memo Name Check */
    if (!(e.target as HTMLFormElement).Title.value) {
      // 메모 이름이 없는 경우
      setModalContent({
        header: "Bookmark Name",
        message: "You must enter memo name",
        toggle: "view",
      });
      return;
    }
    if ((e.target as HTMLFormElement).Title.value.length > 15) {
      // 메모 이름이 15글자 이상인 경우
      setModalContent({
        header: "Bookmark Name",
        message: "the maximum number of characters for a memo is 15",
        toggle: "view",
      });
      return;
    }

    /* Memo Content Check */
    if (!(e.target as HTMLFormElement).Text.value) {
      // 내용이 없는 경우
      setModalContent({
        header: "Bookmark URL",
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

  // =========================================================================
  /* <Event Handler> - Memo Create*/
  const alarmCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!(e.target as HTMLFormElement).Title.value) {
      // 알람 이름이 없는 경우
      setModalContent({
        header: "Bookmark Name",
        message: "You must enter alarm name",
        toggle: "view",
      });
      return;
    }

    if (!startDate) {
      // 알람 날짜가 없는 경우
      setModalContent({
        header: "Bookmark Name",
        message: "You must pick a date",
        toggle: "view",
      });
      return;
    }

    /* createAlarm Axios */
    createAlarm(e, startDate);

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

  /* <Axios Request> - Memo Axios Post /api/alarm */
  const createAlarm = async (e: any, startDate: any) => {
    try {
      await axios.post<Post>("/api/alarm", {
        alarmName: e.target.Title.value,
        date: startDate,
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
  // DataPicker

  /* DatePicker */
  const [startDate, setStartDate] = useState<Date>(
    setHours(setMinutes(new Date(), 30), 16)
  );

  /* DatePicker Change Handler */
  const dateHandleChange = (date: any) => {
    setStartDate(date);
  };

  //--------------------------------------------------------
  // Render

  /* Select Form Whether Memo or Alarm */
  const formControl = () => {
    if (props.type == "newmemo") {
      return (
        <form className="edit-form" onSubmit={memoCreate}>
          <input
            className="form-control"
            type="text"
            placeholder={`Category: #${props.category}`}
            aria-label="Disabled input example"
            disabled
          ></input>
          <input
            className="form-control"
            id="Title"
            placeholder="Title"
          ></input>

          <textarea
            className="form-control"
            id="Text"
            placeholder="Content"
          ></textarea>
          <button type="submit" className="login-button mt-2 mb-4">
            Edit
          </button>
        </form>
      );
    } else if (props.type == "newalarm") {
      return (
        <form className="edit-form" onSubmit={alarmCreate}>
          <input
            className="form-control"
            type="text"
            placeholder={`Category: #${props.category}`}
            aria-label="Disabled input example"
            disabled
          ></input>
          <input
            className="form-control"
            id="Title"
            placeholder="Title"
          ></input>

          <DatePicker
            className="datapicker"
            selected={startDate}
            onChange={dateHandleChange}
            showTimeSelect
            timeFormat="HH:mm"
            injectTimes={[
              setHours(setMinutes(new Date(), 1), 0),
              setHours(setMinutes(new Date(), 5), 12),
              setHours(setMinutes(new Date(), 59), 23),
            ]}
            dateFormat="MMMM d, yyyy h:mm aa"
            id="Date"
          />
          <button type="submit" className="login-button mt-2 mb-4">
            Edit
          </button>
        </form>
      );
    }
  };

  //--------------------------------------------------------
  // return

  return <>{formControl()}</>;
};

export default Edit;
