import axios, { AxiosResponse } from "axios";
import React, { FC, useState } from "react";
import Header from "../common/Header";

// Interfaces
interface Get {
  Error: any;
  box: string;
  img: string;
  length: number;
  i: number;
  [index: number]: any;

  memoName: string;
  memoContent: string;
}

interface P {
  memoId: string;
}

// React Start from here
const GptMain: FC<P> = (props: P): JSX.Element => {
  //--------------------------------------------------------
  // Declaration of useState, useContext, useRef ...
  const [techInput, setTechInput] = useState("");

  //--------------------------------------------------------
  // Event Handler

  //   onSubmit Event
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(techInput);
  }

  //--------------------------------------------------------
  // Axios Request

  //--------------------------------------------------------
  /* Fetching Data */

  //--------------------------------------------------------
  // return

  return (
    <>
      {/* Header */}
      <Header header="GPT" search={false} />
      {/* Main */}
      <div>
        <main className="gpt_main">
          <h3>Tech Interview</h3>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="question"
              placeholder="Enter your tech stack"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
            />
            <input type="submit" value="Generate" />
          </form>
          <div>
            <form className="edit-form">
              <input
                className="form-control"
                type="text"
                placeholder={`What is the difference between null and undefined in JavaScript?`}
                aria-label="Disabled input example"
                disabled
              ></input>
              <textarea
                className="form-control"
                id="Text"
                placeholder="Write your answer here"
              ></textarea>
              <button type="submit" className="login-button mt-2 mb-4">
                Check my answer
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default GptMain;
