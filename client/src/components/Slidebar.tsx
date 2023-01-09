import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import { faGauge } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter, Link } from "react-router-dom";

const Slidebar: React.FC = () => {
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

      {/* Slidebar - Dashboard */}
      <li className="nav-item sidebar-dashboard-container">
        <Link to='/dashboard' className="nav-link sidebar-dashboard" aria-current="page">
          <div>
            <FontAwesomeIcon icon={faGauge} />
          </div>
          <div className="sidebar-dashboard-explain">&nbsp; Dashboard</div>
        </Link>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider my-3" />

      <li className="nav-item my-1 sidebar-bookmark-container">
        <Link to='/bookmark' className="nav-link sidebar-bookmark">
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
          <div className="sidebar-bookmark-explain">&nbsp; Bookmark</div>
        </Link>
      </li>

      <li className="nav-item my-1 sidebar-schedule-container">
        <Link to='/schedule' className="nav-link sidebar-schedule">
          <div>
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div className="sidebar-schedule-explain">&nbsp; Schedule</div>
        </Link>
      </li>
      <li className="nav-item my-1 sidebar-memo-container">
        <Link to='/memo' className="nav-link sidebar-memo">
          <div>
            <FontAwesomeIcon icon={faEdit} />
          </div>
          <div className="sidebar-memo-explain">&nbsp; Memo</div>
        </Link>
      </li>
      <li className="nav-item my-1 sidebar-tag-container">
        <Link to='/tag' className="nav-link sidebar-tag">
          <div>
            <FontAwesomeIcon icon={faTag} />
          </div>
          <div className="sidebar-tag-explain">&nbsp; Tag</div>
        </Link>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider my-0 mt-3 mb-3" />

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
