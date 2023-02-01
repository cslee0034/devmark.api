import axios, { AxiosResponse } from "axios";
import React, { FC, useContext, useEffect, useState } from "react";
import { ModalContext } from "../App";

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

const MemoView: FC<P> = (props: P): JSX.Element => {
  /* Modal Context */
  const { setModalContent } = useContext(ModalContext);

  /* Memo Each State */
  const [viewMemos, setViewMemos] = useState<any>([]);

  /* Delete Memo */
  const deleteMemo = (id: string) => {
    setModalContent({
      header: "Delete_Content",
      toggle: "delete",
      id: id,
    });
  };

  /* Update Memo */
  const updateMemo = (bookmarkId: string) => {
    setModalContent({
      header: "Update_Content",
      toggle: "update",
      id: bookmarkId,
    });
  };

  /* Memo Axios Get /api/memo  -- Get each */
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
        <button type="button" className="login-button mt-2">
          Modify
        </button>
        <button
          type="button"
          className="login-button login-button-delete mt-2 mb-4"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default MemoView;
