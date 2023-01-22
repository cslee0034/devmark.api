import React from "react";
import Search from "../utils/Search";

const FeedPage = (): JSX.Element => {
  return (
    <div className="mainpage-container">
      {/* Header */}
      <h3 className="main-header">
        <div className="main-header-right">Feed</div>
        <div className="main-header-left">
          <Search search="" />
        </div>
      </h3>

      {/* Content */}
    </div>
  );
};

export default FeedPage;
