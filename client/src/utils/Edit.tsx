import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import React, { FC, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

interface P {
  search: string;
}

const Edit: FC<P> = (props: P): JSX.Element => {
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log(e);
  };

  const dateHandleChange = (date: any) => {
    setStartDate(date);
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <input
        className="form-control"
        type="text"
        placeholder="Memo #javascript"
        aria-label="Disabled input example"
        disabled
      ></input>
      <input
        type="email"
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
      />

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
};

export default Edit;
