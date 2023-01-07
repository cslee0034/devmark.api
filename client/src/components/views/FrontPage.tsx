import React from "react";

const FrontPage: React.FC = () => {
  return (
    <div className="frontpage-container">
      <div className="front-page-text">
        <h1>
          Mark your Dev, <br /> Learn faster!
        </h1>
        <h4>
          <br />
          first line explanation ...
          <br />
          second line explanation ...
          <br />
          third line explanation ...
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
