import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import { faGauge } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTag } from "@fortawesome/free-solid-svg-icons";

const Slidebar: React.FC = () => {
  return (
    // Slidebar
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
      {/* Slidebar - Brand */}
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/"
      >
        <div className="sidebar-brand-icon ">
          <FontAwesomeIcon icon={faBookBookmark} size="2x" />
        </div>
        <div className="sidebar-brand-text mx-3 sidebar-brand-explain">Dev-Mark</div>
      </a>

      {/* Divider */}
      <hr className="sidebar-divider my-0 mb-3" />

      {/* Slidebar - Dashboard */}
      <li className="nav-item sidebar-dashboard-container">
        <a className="nav-link sidebar-dashboard" aria-current="page" href="#">
          <div>
            <FontAwesomeIcon icon={faGauge} />
          </div>
          <div className="sidebar-dashboard-explain">&nbsp; Dashboard</div>
        </a>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider my-3" />

      <li className="nav-item my-1 sidebar-bookmark-container">
        <a className="nav-link sidebar-bookmark" href="#">
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
          <div className="sidebar-bookmark-explain">&nbsp; Bookmark</div>
        </a>
      </li>

      <li className="nav-item my-1 sidebar-schedule-container">
        <a className="nav-link sidebar-schedule" href="#">
          <div>
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div className="sidebar-schedule-explain">&nbsp; Schedule</div>
        </a>
      </li>
      <li className="nav-item my-1 sidebar-memo-container">
        <a className="nav-link sidebar-memo" href="#">
          <div>
            <FontAwesomeIcon icon={faEdit} />
          </div>
          <div className="sidebar-memo-explain">&nbsp; Memo</div>
        </a>
      </li>
      <li className="nav-item my-1 sidebar-tag-container">
        <a className="nav-link sidebar-tag" href="#">
          <div>
            <FontAwesomeIcon icon={faTag} />
          </div>
          <div className="sidebar-tag-explain">&nbsp; Tag</div>
        </a>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider my-0 mt-3 mb-3" />

      <li className="nav-item my-1 sidebar-about-container">
        <a className="nav-link sidebar-about" href="#">
          <div>
            <FontAwesomeIcon icon={faCircleQuestion} />
          </div>
          <div className="sidebar-about-explain">&nbsp; About</div>
        </a>
      </li>
    </ul>
  );
};

export default Slidebar;
