import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Memo from "../components/Memo";
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
    } else {
      return (
        <>
          <Memo />
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
