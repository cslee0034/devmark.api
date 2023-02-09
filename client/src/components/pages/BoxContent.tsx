import axios, { AxiosResponse } from "axios";
import React, { FC, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ModalContext } from "../../App";
import { Link } from "react-router-dom";
import Header from "../common/Header";

// Interfaces
interface Get {
  Error: any;
  box: string;
  img: string;
  length: number;
  i: number;
  [index: number]: any;
  boxId: string;
}

interface P {
  boxId: string;
}

// React Start from here
const BoxContent: FC<P> = (props: P): JSX.Element => {
  //--------------------------------------------------------
  // Declaration of useState, useContext, useRef ...

  const { setModalContent } = useContext(ModalContext);
  const [bookmarks, setBoookmarks] = useState<any[][]>([]);

  //--------------------------------------------------------
  // Modals

  /* Add Bookmark */
  const addBookmark = () => {
    setModalContent({
      header: "Edit_Bookmark",
      toggle: "create",
      id: props.boxId,
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

  /* Update Content */
  const updateContent = (bookmarkId: string) => {
    setModalContent({
      header: "Update_Content",
      toggle: "update",
      id: bookmarkId,
    });
  };

  //--------------------------------------------------------
  // Axios Request

  /* <Axios Request> - Memo Axios Get /api/content */
  const getBookmark = async () => {
    try {
      await axios.get<Get>(`/api/content?boxId=${props.boxId}`).then((res) => {
        console.log(res);
        console.log(res.data.length);
        const newBookmark: Array<any[]> = [];
        /*
         * [bookmarkName, encodedName, bookmarkURL, bookmarkId, [memoId, memoName]
         * 형태로 변환하여 state에 저장한다.
         */
        for (let i = 0; i < res.data.length; i++) {
          const bookmarkName: string = res.data[i].contentName;
          const encodedName: string = encodeURIComponent(bookmarkName);
          const bookmarkURL: string = res.data[i].URL;
          const bookmarkId: string = res.data[i].id;

          const newMemo = [];
          for (let j = 0; j < res.data[i].Memos.length; j++) {
            const memoId: string = res.data[i].Memos[j].id;
            const memoName: string = res.data[i].Memos[j].memoName;

            newMemo.push([memoId, memoName]);
          }

          newBookmark.push([
            bookmarkName,
            encodedName,
            bookmarkURL,
            bookmarkId,
            newMemo,
          ]);
          setBoookmarks(newBookmark);
        }
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
    const fetchBookmark = async () => {
      try {
        await getBookmark();
      } catch (e) {
        console.error(e);
      }
    };
    fetchBookmark();
  }, []);

  //--------------------------------------------------------
  // return

  return (
    <>
      {/* Header */}
      <Header header="Bookmark" search={false} />

      {/* Content */}
      {bookmarks ? (
        // bookmaks가 있다면
        <>
          {bookmarks.map((bookmark, index) => (
            // bookmarks를 순회하며 조회
            <div className="card bookmark-card" key={index}>
              <div className="bookmark-card-header">
                <div className="bookmark-card-header-left">
                  <a href={bookmark[2]} target="_blank">
                    {/* 이동할 북마크 링크 */}
                    <button className="bookmark-menu">{bookmark[0]}</button>
                    {/* 북마크 이름 */}
                  </a>
                </div>

                <div className="bookmark-card-header-right">
                  <div className="dropdown">
                    <button
                      className="bookmark-menu btn data-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>

                    {/* Memo 있다면 표시 */}
                    <ul className="dropdown-menu bookmark-dropdown">
                      {bookmark[4] ? (
                        // memo가 있다면
                        <div>
                          {bookmark[4].map(
                            // dropdown item의 형태로 출력
                            (memo: Array<string>, index: number) => (
                              <li key={index}>
                                <Link
                                  to={`/memos/${memo[0]}?category=${bookmark[0]}`}
                                  // 클릭시 해당 memo로 이동
                                  className="dropdown-item"
                                >
                                  {memo[1]}
                                </Link>
                              </li>
                            )
                          )}
                        </div>
                      ) : null}

                      <li>
                        <Link
                          to={`/memos/newmemo?category=${bookmark[1]}&box=${props.boxId}&bookmarkId=${bookmark[3]}`}
                          className="dropdown-item"
                          // 클릭시 쿼리스트링으로 정보를 가진채 newmemo로 이동
                        >
                          New &nbsp;
                          <FontAwesomeIcon icon={faPlus} />
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <button className="bookmark-menu">
                    <Link
                      to={`/alarms/newalarm?category=${bookmark[1]}&box=${props.boxId}&bookmarkId=${bookmark[3]}`}
                      className="dropdown-item"
                      // 클릭시 쿼리스트링으로 정보를 가진채 newalarm으로 이동
                    >
                      <FontAwesomeIcon icon={faClock} />
                    </Link>
                  </button>
                  <button className="bookmark-menu">
                    <FontAwesomeIcon
                      icon={faWrench}
                      // Modify
                      onClick={() => {
                        updateContent(bookmark[3]);
                      }}
                    />
                  </button>
                  <button className="bookmark-menu">
                    <FontAwesomeIcon
                      icon={faBan}
                      // Delete
                      onClick={() => {
                        deleteContent(bookmark[3]);
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* New */}
          <div className="card bookmark-card">
            <div className="bookmark-card-header">
              <div className="bookmark-card-header-left">
                <button className="bookmark-menu" onClick={addBookmark}>
                  New
                </button>
              </div>

              <div className="bookmark-card-header-right">
                <div className="bookmark-placeholder" />
              </div>
            </div>
          </div>
        </>
      ) : (
        //  New
        <div className="card bookmark-card">
          <div className="bookmark-card-header">
            <div className="bookmark-card-header-left">
              <button className="bookmark-menu" onClick={addBookmark}>
                New
              </button>
            </div>

            <div className="bookmark-card-header-right">
              <div className="bookmark-placeholder" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BoxContent;
