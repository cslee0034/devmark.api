import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../App";

const NavBar: React.FC = () => {
  const { setSidebar } = useContext(UserContext);

  return (
    // Navbar
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* Slidebar Toggle */}
      <button
        type="button"
        className="btn sidebar-toggle"
        // onclickEvent Toggle
        onClick={() => setSidebar((prev: any) => !prev)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Search */}
      <nav className="d-sm-inline-block form-inline navbar-search">
        <div className="container-fluid">
          <form className="d-flex">
            <input
              className="form-control bg-light border-0 small"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-* btn-search" type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </div>
      </nav>

      {/* Topbar Navbar */}
      <ul className="navbar-nav navbar-left-container">
        {/* Notification */}
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            <FontAwesomeIcon icon={faBell} />
          </a>
        </li>

        {/* BlockBar */}
        <div className="vr m-2"></div>

        {/* Dropdown UserName */}
        <div className="btn-group username">
          <button
            type="button"
            className="btn data-toggle username-item"
            data-bs-toggle="dropdown"
            data-bs-display="static"
            aria-expanded="false"
          >
            <span className="namespace">UserName&nbsp;</span>
            <div>
              <FontAwesomeIcon icon={faUser} />
            </div>
          </button>
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Setting
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
