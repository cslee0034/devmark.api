import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import MemoMain from "../components/MemoMain";
import MemoView from "../components/MemoView";
import Edit from "../utils/Edit";
import Scrollback from "../utils/Scrollback";

const MemoPage = (): JSX.Element => {
  /* Get Memo_id */
  const { memo_id } = useParams<string>();
  /* 쿼리스트링 해석 */
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const bookmarkId = searchParams.get("bookmarkId");

  /* Render Page or EditMemo */
  const memoPageRender = () => {
    if (memo_id === "newmemo" && category && bookmarkId) {
      return (
        <>
          <Edit category={category} bookmarkId={bookmarkId} />
        </>
      );
    }
    if (memo_id) {
      return (
        <>
          <MemoView memoId={memo_id} />
        </>
      );
    } else {
      return (
        <>
          <MemoMain memoId="" />
        </>
      );
    }
  };

  return (
    <>
      {memoPageRender()}
      <Scrollback />
    </>
  );
};

export default MemoPage;
