import axios, { AxiosResponse } from "axios";
import React, { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ModalContext } from "../App";
import Search from "../utils/Search";

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

// React Start from here
const MemoMain: FC<P> = (props: P): JSX.Element => {
  //--------------------------------------------------------
  // Declaration of useState, useContext, useRef ...

  /* Modal Context */
  const { setModalContent } = useContext(ModalContext);

  /* Memo State */
  const [memos, setMemos] = useState<any>([]);
  const [memoheaders, setMemoheaders] = useState<any>([]);

  //--------------------------------------------------------
  // Axios Request

  /* <Axios Request> - Memo Axios Get /api/box -- Get All */
  const getMemos = async () => {
    try {
      await axios.get<Get>("/api/memo").then((res) => {
        // Memo를 반환하는 함수에 맞춰 순회할 수 있게 값을 Array에 넣어준다
        let X: any = []; // memoheader
        let Y: any = []; // temp
        let Z: any = []; // memocontent
        if (res.data) {
          for (let i = 0; i < res.data.length; i++) {
            if (i === 0) {
              // push header, content at first place
              X.push(res.data[i].contentName);
              Y.push([res.data[i].memoName, res.data[i].id]);
            } else {
              // if header is same as former
              if (res.data[i].contentName === res.data[i - 1].contentName) {
                // only push content
                Y.push([res.data[i].memoName, res.data[i].id]);
              } else {
                // move content into Z box
                Z.push(Y);
                Y = [];
                // reset Y box and push header, content
                X.push(res.data[i].contentName);
                Y.push([res.data[i].memoName, res.data[i].id]);
              }
            }
          }
          Z.push(Y);
        }
        setMemoheaders(X);
        setMemos(Z);
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
        await getMemos();
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
      {/* Header */}
      <h3 className="main-header">
        <div className="main-header-right">Memo</div>
        <div className="main-header-left">
          <Search search="" />
        </div>
      </h3>
      <>
        {memos[0] != "" ? (
          // 메모가 있다면
          <div className="memo-container">
            <div className="card memo-card mb-4">
              {memoheaders.map((memoHeader: any, index: number) => (
                // memoheader 순환
                <div className="memo-div" key={index}>
                  <div className="card-header"># {memoHeader}</div>
                  <ul className="list-group list-group-flush memo-list">
                    {memos[index].map((memos: any, idx: number) => (
                      // memo 내용 순환
                      <div key={idx}>
                        <Link
                          to={`/memos/${memos[1]}?category=${memoHeader}`}
                          className="memo-link"
                        >
                          <li className="list-group-item memo-list-name">
                            {memos[0]}
                          </li>
                        </Link>
                      </div>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </>
    </>
  );
};

export default MemoMain;
