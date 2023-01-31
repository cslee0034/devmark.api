import axios, { AxiosResponse } from "axios";
import React, { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ModalContext } from "../App";
import Search from "../utils/Search";

interface Get {
  Error: any;
  box: string;
  img: string;
  length: number;
  i: number;
  [index: number]: any;
  boxId: string;
}

interface P {}

const Memo: FC<P> = (props: P): JSX.Element => {
  /* Modal Context */
  const { setModalContent } = useContext(ModalContext);

  /* Memo State */
  const [memos, setMemos] = useState<string[][]>([]);

  /* Add Memo */
  const addBookmark = () => {
    setModalContent({
      header: "Edit_Bookmark",
      toggle: "create",
    });
  };

  /* Delete Memo */
  const deleteMemo = (id: string) => {
    setModalContent({
      header: "Delete_Content",
      toggle: "delete",
      id: id,
    });
  };

  const updateMemo = (bookmarkId: string) => {
    setModalContent({
      header: "Update_Content",
      toggle: "update",
      id: bookmarkId,
    });
  };

  /* Memo Axios Get /api/memo */
  const getMemo = async () => {
    try {
      await axios.get<Get>("/api/memo").then((res) => {
        const newMemo: Array<string[]> = [];
        for (let i = 0; i < res.data.length; i++) {
          const memoName: string = res.data[i].memoName;
          const memoContent: string = res.data[i].meemoContent;
          const bookmarkId: string = res.data[i].bookmarkId;
          newMemo.push([memoName, memoContent, bookmarkId]);
          setMemos(newMemo);
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
  /* Fetching Data */
  // useEffect(() => {
  //   const fetchMemos = async () => {
  //     try {
  //       await getMemo();
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  //   fetchMemos();
  // }, []);

  return (
    <>
      {/* Header */}
      <h3 className="main-header">
        <div className="main-header-right">Memo</div>
        <div className="main-header-left">
          <Search search="" />
        </div>
      </h3>

      <div className="memo-container">
        <div className="card memo-card">
          <div className="card-header">#bookmarkName</div>
          <ul className="list-group list-group-flush memo-list">
            <Link to="/">
              <li className="list-group-item memo-list-name">memoName</li>
            </Link>
            <Link to="/">
              <li className="list-group-item">memoName</li>
            </Link>
            <Link to="/">
              <li className="list-group-item">memoName</li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Memo;
