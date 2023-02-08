import axios, { AxiosResponse } from "axios";
import React, { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ModalContext } from "../../App";

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
  category: string;
}

interface Delete {
  Error: any;
  memoId: string;
}

interface Patch {
  Error: any;
}

// React Start from here
const MemoView: FC<P> = (props: P): JSX.Element => {
  const { memo_id } = useParams<string>();
  //--------------------------------------------------------
  // Declaration of useState, useContext, useRef ...

  /* Modal Context */
  const { setModalContent } = useContext(ModalContext);

  /* Memo Each State */
  const [viewMemos, setViewMemos] = useState<string[]>([]);
  const [modify, setModify] = useState<boolean>(false);

  //--------------------------------------------------------
  // Event Handler

  /* <Event Handler> - Delete Memo */
  const handelDeleteMemo = (e: React.MouseEvent<HTMLElement>) => {
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

  /* <Event Handler> - Toggle Modify */
  const handleModifyToggle = (e: React.MouseEvent<HTMLElement>) => {
    setModify(true);
  };

  /* <Event Handler> - Update Memo */
  const handleUpdateMemo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* Delete Box */
    updateMemo(e, memo_id!);
    /* Reload */
    window.location.reload();
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
          header: "ERROR",
          message: error.response.data.Error,
          toggle: "view",
        });
      }
    }
  };

  /* <Axios Request> - Memo Axios Delete /api/memo */
  const deleteMemo = async (memoId: string) => {
    try {
      await axios.delete<Delete>("/api/memo", {
        data: {
          id: memoId,
        },
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
          header: "ERROR",
          message: error.response.data.Error,
          toggle: "view",
        });
      }
    }
  };

  /* <Axios Request> - Memo Axios Delete /api/memo */
  const updateMemo = async (e: any, memoId: string) => {
    try {
      await axios.patch<Patch>("/api/memo", {
        memoName: e.target[1].value,
        memoContent: e.target[2].value,
        id: memoId,
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
          header: "ERROR",
          message: error.response.data.Error,
          toggle: "view",
        });
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
      {modify ? (
        <>
          <form className="edit-form" onSubmit={handleUpdateMemo}>
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
              defaultValue={viewMemos[0]}
            ></input>

            <textarea className="form-control" id="Text" placeholder="Content">
              {viewMemos[1]}
            </textarea>
            <button type="submit" className="login-button mt-2 mb-4">
              Modify
            </button>
          </form>
        </>
      ) : (
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
            onClick={handleModifyToggle}
          >
            Modify
          </button>
          <button
            type="button"
            className="login-button login-button-delete mt-2 mb-4"
            onClick={handelDeleteMemo}
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default MemoView;
