import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const Slidebar = (): JSX.Element => {
  return (
    // Slidebar
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion mb-3">
      {/* Slidebar - Brand */}

      <Link to='/'
        className="sidebar-brand d-flex align-items-center justify-content-center"
      >
        <div className="sidebar-brand-icon ">
          <FontAwesomeIcon icon={faBookBookmark} size="2x" />
        </div>
        <div className="sidebar-brand-text mx-3 sidebar-brand-explain">Dev-Mark</div>
      </Link>

      {/* Divider */}
      <hr className="sidebar-divider my-0 mb-3" />

      {/* Slidebar - Bookmark */}
      <li className="nav-item my-1 sidebar-bookmark-container">
        <Link to='/bookmarks' className="nav-link sidebar-bookmark">
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
          <div className="sidebar-bookmark-explain">&nbsp; Bookmark</div>
        </Link>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider my-3" />

      {/* Slidebar - Alarm */}
      <li className="nav-item my-1 sidebar-Alarm-container">
        <Link to='/alarms' className="nav-link sidebar-Alarm">
          <div>
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div className="sidebar-Alarm-explain">&nbsp; Alarm</div>
        </Link>
      </li>

      {/* Slidebar - Memo */}
      <li className="nav-item my-1 sidebar-memo-container">
        <Link to='/memos' className="nav-link sidebar-memo">
          <div>
            <FontAwesomeIcon icon={faEdit} />
          </div>
          <div className="sidebar-memo-explain">&nbsp; Memo</div>
        </Link>
      </li>

      {/* Slidebar - Feed */}
      <li className="nav-item my-1 sidebar-feed-container">
        <Link to='/feed' className="nav-link sidebar-feed">
          <div>
          <FontAwesomeIcon icon={faComment} />
          </div>
          <div className="sidebar-feed-explain">&nbsp; Feed</div>
        </Link>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider my-0 mt-3 mb-3" />

      {/* Slidebar - About */}
      <li className="nav-item my-1 sidebar-about-container">
        <Link to='/about' className="nav-link sidebar-about">
          <div>
            <FontAwesomeIcon icon={faCircleQuestion} />
          </div>
          <div className="sidebar-about-explain">&nbsp; About</div>
        </Link>
      </li>
    </ul>
  );
};

export default Slidebar;
