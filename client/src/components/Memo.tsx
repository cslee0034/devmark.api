import axios, { AxiosResponse } from "axios";
import React, { FC, useContext, useEffect, useState } from "react";
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

  /* Add Bookmark */
  const addBookmark = () => {
    setModalContent({
      header: "Edit_Bookmark",
      toggle: "create",
    });
  };

  /* Delete Content */
  const deleteContent = (id: string) => {
    setModalContent({
      header: "Delete_Content",
      toggle: "delete",
      id: id,
    });
  };

  const updateContent = (bookmarkId: string) => {
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
  useEffect(() => {
    const fetchBoxs = async () => {
      try {
        await getMemo();
      } catch (e) {
        console.error(e);
      }
    };

    fetchBoxs();
  }, []);

  return (
    <>
      {/* Header */}
      <h3 className="main-header">
        <div className="main-header-right">Bookmark</div>
        <div className="main-header-left">
          <Search search="" />
        </div>
      </h3>

      <div className="card tils-card">
        <div className="card-header">2023-01</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">05</li>
          <li className="list-group-item">04</li>
          <li className="list-group-item">03</li>
          <li className="list-group-item">02</li>
          <li className="list-group-item">01</li>
        </ul>
      </div>
    </>
  );
};

export default Memo;
