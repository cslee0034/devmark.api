import axios, { AxiosResponse } from "axios";
import React, { FC, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
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

interface P {
  boxId: string;
}

const BoxContent: FC<P> = (props: P): JSX.Element => {
  const { setModalContent } = useContext(ModalContext);
  const [bookmarks, setBoookmarks] = useState<string[][]>([]);

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

  const updateContent = (bookmarkId: string) => {
    setModalContent({
      header: "Update_Content",
      toggle: "update",
      id: bookmarkId,
    });
  };

  /* Get Box */
  const getBox = async () => {
    try {
      await axios
        .get<Get>(`/api/content/page?boxId=${props.boxId}`)
        .then((res) => {
          const newBookmark = [];
          for (let i = 0; i < res.data.length; i++) {
            const bookmarkName = res.data[i].contentName;
            const bookmarkURL = res.data[i].URL;
            const bookmarkId = res.data[i].id;
            newBookmark.push([bookmarkName, bookmarkURL, bookmarkId]);
            setBoookmarks(newBookmark);
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
    const fetchBookmarks = async () => {
      try {
        await getBox();
      } catch (e) {
        console.error(e);
      }
    };
    fetchBookmarks();
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

      {/* Content */}
      {bookmarks ? (
        <>
          {bookmarks.map((bookmark, index) => (
            <div className="card bookmark-card" key={index}>
              <div className="bookmark-card-header">
                <div className="bookmark-card-header-left">
                  <a href={bookmark[1]} target="_blank">
                    <button className="bookmark-menu">{bookmark[0]}</button>
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

                    <ul className="dropdown-menu bookmark-dropdown">
                      <li>
                        <a className="dropdown-item" href="#">
                          hi
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Memo &nbsp;
                          <FontAwesomeIcon icon={faPlus} />
                        </a>
                      </li>
                    </ul>
                  </div>

                  <button className="bookmark-menu">
                    <FontAwesomeIcon icon={faClock} />
                  </button>
                  <button className="bookmark-menu">
                    <FontAwesomeIcon
                      icon={faWrench}
                      onClick={() => {
                        updateContent(bookmark[2]);
                      }}
                    />
                  </button>
                  <button className="bookmark-menu">
                    <FontAwesomeIcon
                      icon={faBan}
                      onClick={() => {
                        deleteContent(bookmark[2]);
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
