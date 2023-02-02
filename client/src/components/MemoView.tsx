import axios, { AxiosResponse } from "axios";
import React, { FC, useContext, useEffect, useState } from "react";
import { ModalContext } from "../App";

// Interfaces
interface Get {
  Error: any;
  box: string;
  img: string;
  length: number;
  i: number;
  [index: number]: any;
  boxId: string;
  memoArr: any;

  memoName: string;
  memoContent: string;
}

interface P {
  memoId: string;
}

interface Delete {
  Error: any;
  memoId: string;
}

// React Start from here
const MemoView: FC<P> = (props: P): JSX.Element => {
  //--------------------------------------------------------
  // Declaration of useState, useContext, useRef ...

  /* Modal Context */
  const { setModalContent } = useContext(ModalContext);

  /* Memo Each State */
  const [viewMemos, setViewMemos] = useState<any>([]);

  //--------------------------------------------------------
  // Event Handler

  /* <Event Handler> - Delete Memo */
  const memoDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    /* Delete Confirm */
    if (!window.confirm("Are you sure to delete?")) {
      return;
    }
    /* Delete Box */
    deleteMemo(props.memoId);
    /* Reload */
    window.location.replace("/memos");
  };

  /* <Event Handler> - Update Memo */
  const memoUpdate = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    /* Delete Confirm */
    if (!window.confirm("Are you sure to delete?")) {
      return;
    }
    /* Delete Box */
    deleteMemo(props.memoId);
    /* Reload */
    window.location.replace("/memos");
  };

  //--------------------------------------------------------
  // Axios Request

  /* <Axios Request> - Memo Axios Get /api/memo  -- Get each */
  const getMemoEach = async () => {
    try {
      await axios
        .get<Get>(`/api/memo/each?memoId=${props.memoId}`)
        .then((res) => {
          const memoName = res.data.memoName;
          const memoContent = res.data.memoContent;
          setViewMemos([memoName, memoContent]);
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

  /* <Axios Request> - Memo Axios Delete /api/memo */
  const deleteMemo = async (memoId: string) => {
    try {
      await axios
        .delete<Delete>("/api/memo", {
          data: {
            id: memoId,
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

  //--------------------------------------------------------
  /* Fetching Data */

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        await getMemoEach();
      } catch (e) {
        console.error(e);
      }
    };

    fetchMemos();
  }, []);

  //--------------------------------------------------------
  // return

  return (
    <>
      <div className="memo-view-container-wrapper">
        <div className="memo-view-container">
          <div className="memo-view-head-container">
            <h3 className="memo-view-head">
              <small className="text-muted">{viewMemos[0]}</small>
            </h3>
          </div>
          <div className="memo-view-main-container">
            <div className="memo-view-main">
              <div className="memo-main-content">{viewMemos[1]}</div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="login-button mt-2"
          onClick={memoUpdate}
        >
          Modify
        </button>
        <button
          type="button"
          className="login-button login-button-delete mt-2 mb-4"
          onClick={memoDelete}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default MemoView;
