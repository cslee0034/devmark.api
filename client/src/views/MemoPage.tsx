import axios, { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ModalContext } from "../App";
import Edit from "../utils/Edit";
import Scrollback from "../utils/Scrollback";
import Search from "../utils/Search";

interface Get {
  Error: any;
  box: string;
  length: number;
  i: number;
  [index: number]: any;
}


const MemoPage = (): JSX.Element => {
  /* Get Memo_id */
  const { memo_id } = useParams();
  /* 쿼리스트링 해석 */
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const bookmarkId = searchParams.get("bookmarkId");

  /* Modal Context */
  const { setModalContent } = useContext(ModalContext);

  /* Memo State */
  const [memos, setMemos] = useState<string[][]>([]);

  /* Memo Axios Get /api/memo */
  const getMemo = async () => {
    try {
      await axios.get<Get>("/api/memo").then((res) => {
        const newMemo = [];
        for (let i = 0; i < res.data.length; i++) {
          const memoName = res.data[i].memoName;
          const meemoContent = res.data[i].meemoContent;
          const bookmarkId = res.data[i].bookmarkId;
          newMemo.push([memoName, meemoContent, bookmarkId]);
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

  /* Render Page or EditMemo */
  const editMemo = () => {
    if (memo_id === "newmemo" && category && bookmarkId) {
      return (
        <>
          <Edit category={category} bookmarkId={bookmarkId} />
        </>
      );
    }
  };

  /* Render Page or EditMemo */
  const renderPage = () => {
    return (
      <>
        {/* Content */}
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

        {/* Button */}

        <div
          className="btn-toolbar mb-3"
          role="toolbar"
          aria-label="Toolbar with button groups"
        >
          <div className="btn-group me-2" role="group" aria-label="First group">
            <button type="button" className="btn btn-outline-secondary">
              {"<"}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary disabled btn-center-disable"
            >
              &nbsp;&nbsp;
            </button>
            <button type="button" className="btn btn-outline-secondary">
              {">"}
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {/* Header */}
      <h3 className="main-header">
        <div className="main-header-right">Memo</div>
        <div className="main-header-left">
          <Search search="" />
        </div>
      </h3>
      {renderPage()}
      {editMemo()}
      <Scrollback />
    </>
  );
};

export default MemoPage;
