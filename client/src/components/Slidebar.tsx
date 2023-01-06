import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";

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
        <div className="sidebar-brand-text mx-3">Dev-Mark</div>
      </a>

      {/* Divider */}
      <hr className="sidebar-divider my-0 mb-3" />

      {/* Slidebar - Dashboard */}
      <li className="nav-item dashboard">
        <a className="nav-link active" aria-current="page" href="#">
          Dashboard
        </a>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider my-3" />

      <li className="nav-item">
        <a className="nav-link" href="#">
          Bookmarks
        </a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="#">
          Link
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Link
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Link
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Link
        </a>
      </li>
    </ul>
  );
};

export default Slidebar;
