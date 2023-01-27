import React from "react";
import Scrollback from "../utils/Scrollback";

const AboutPage = (): JSX.Element => {
  return (
    <div className="frontpage-container">
      <div className="front-page-text mt-1">
        <h2>
          <mark>Bookmark</mark>
        </h2>
        <h4>use Bookmark to organize your bookmarks</h4>

        <hr className="sidebar-divider my-0 mt-4 mb-4" />

        <h2>
          <mark>Alarm</mark>
        </h2>
        <h4>use Alarm to manage your day</h4>

        <hr className="sidebar-divider my-0 mt-4 mb-4" />

        <h2>
          <mark>TILs</mark>
        </h2>
        <h4>use TILs to record your daily leaning</h4>

        <hr className="sidebar-divider my-0 mt-4 mb-4" />

        <h2>
          <mark>Feed</mark>
        </h2>
        <h4>use Feed to share your experience</h4>
      </div>
      <img
        className="background-img"
        src={`${process.env.PUBLIC_URL}/images/Frontpage-background.png`}
      ></img>
      <Scrollback />
    </div>
  );
};

export default AboutPage;
