import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import React, { FC, useContext, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios, { AxiosResponse } from "axios";
import { ModalContext } from "../App";

interface Post {
  Error: any;
  box: string;
  url: string;
}
interface P {
  category: string;
  bookmarkId: string;
}

const Edit: FC<P> = (props: P): JSX.Element => {
  const { setModalContent } = useContext(ModalContext);

  /* Memo Create */
  const MemoCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* createMemo Axios */
    createMemo(e);
  };

  const createMemo = async (e: any) => {
    try {
      await axios
        .post<Post>("/api/memo", {
          memoName: e.target[1].value,
          memoContent: e.target[2].value,
          bookmarkId: props.bookmarkId,
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

  /* DatePicker */
  const [startDate, setStartDate] = useState<Date>(
    setHours(setMinutes(new Date(), 30), 16)
  );

  /* DatePicker Handel Submit */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  /* DatePicker Change Handler */
  const dateHandleChange = (date: any) => {
    setStartDate(date);
  };

  /* Select Form Whether Memo or Alarm */
  const formControl = () => {
    if (props.bookmarkId) {
      return (
        <form className="edit-form" onSubmit={MemoCreate}>
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

          {/* <DatePicker
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
      /> */}

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
    } else {
      <form className="edit-form" onSubmit={handleSubmit}>
        <input
          className="form-control"
          type="text"
          placeholder={`Category: #${props.category}`}
          aria-label="Disabled input example"
          disabled
        ></input>
        <input className="form-control" id="Title" placeholder="Title"></input>

        {/* <DatePicker
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
      /> */}

        <textarea
          className="form-control"
          id="Text"
          placeholder="Content"
        ></textarea>
        <button type="submit" className="login-button mt-2 mb-4">
          Edit
        </button>
      </form>;
    }
  };

  return <>{formControl()}</>;
};

export default Edit;
