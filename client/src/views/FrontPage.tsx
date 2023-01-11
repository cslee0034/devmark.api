import React from "react";

const FrontPage = (): JSX.Element => {
  return (
    <div className="frontpage-container">
      <div className="front-page-text">
        <h1>
          Mark your Dev, <br /> Learn faster!
        </h1>
        <h4>
          <br />
          Dev-Mark helps you organize your bookmarks
          <br />
          <br />
          And manage your dev-life
          <br />
          <br />
          Use feed to share your Dev experience!
        </h4>
      </div>
      <img
        className="background-img"
        src={`${process.env.PUBLIC_URL}/images/Frontpage-background.png`}
      ></img>
    </div>
  );
};

export default FrontPage;
