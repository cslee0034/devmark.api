import React from "react";

const AboutPage = (): JSX.Element => {
  return (
    <div className="frontpage-container">
      <div className="front-page-text mt-1">
        <h1>
          <mark>Bookmark</mark>
        </h1>
        <h3>use Bookmark to organize your bookmarks</h3>

        <hr className="sidebar-divider my-0 mt-4 mb-4" />

        <h1>
          <mark>Alarm</mark>
        </h1>
        <h3>use Alarm to manage your day</h3>

        <hr className="sidebar-divider my-0 mt-4 mb-4" />

        <h1>
          <mark>TILs</mark>
        </h1>
        <h3>use TILs to record your daily leaning</h3>

        <hr className="sidebar-divider my-0 mt-4 mb-4" />

        <h1>
          <mark>Feed</mark>
        </h1>
        <h3>use Feed to share your experience</h3>
      </div>
      <img
        className="background-img"
        src={`${process.env.PUBLIC_URL}/images/Frontpage-background.png`}
      ></img>
    </div>
  );
};

export default AboutPage;
