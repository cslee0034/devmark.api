import React, { FC, useState } from "react";
interface P {
  temp: string;
}

const Bookmark: FC<P> = (props: P): JSX.Element => {

  return (
    // Content
    <div className="card bookmark-card">
      <div className="bookmark-card-header">
        <div className="bookmark-card-header-left">
          <button className="bookmark-menu">Bookmark1</button>
        </div>

        <div className="bookmark-card-header-right">
          <button className="bookmark-menu">Memo</button>
          <button className="bookmark-menu">Alarm</button>
          <button className="bookmark-menu">Modify</button>
          <button className="bookmark-menu">X</button>
        </div>
      </div>
    </div>   
  );
};

export default Bookmark;
