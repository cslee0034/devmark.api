import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import AlarmMain from "../components/AlarmMain";
import Edit from "../utils/Edit";
import Scrollback from "../utils/Scrollback";

const AlarmPage = (): JSX.Element => {
  /* Get Memo_id */
  const { alarm_id } = useParams<string>();
  /* 쿼리스트링 해석 */
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const boxId = searchParams.get("box");
  const bookmarkId = searchParams.get("bookmarkId");

  /* Render Page or EditMemo */
  const alarmPageRender = () => {
    if (alarm_id === "newalarm" && category && boxId && bookmarkId) {
      return (
        <>
          <Edit
            type={alarm_id}
            category={category}
            boxId={boxId}
            bookmarkId={bookmarkId}
          />
        </>
      );
    } else {
      return <>{ <AlarmMain /> }</>;
    }
  };

  return (
    <div className="mainpage-container">
      {/* Header */}
      <h3 className="main-header">Alarm</h3>
      {alarmPageRender()}
      <Scrollback />
    </div>
  );
};

export default AlarmPage;
