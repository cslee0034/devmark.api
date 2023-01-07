import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const NavBar: React.FC = () => {
  const [toggle, setToggle] = useState(false);

  return (
    // Navbar
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* Slidebar Toggle */}
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
        // onclickEvent Toggle
        onClick={() => {
          setToggle((e) => !e);
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Search */}
      <nav className="d-none d-sm-inline-block form-inline navbar-search">
        <div className="container-fluid">
          <form className="d-flex">
            <input
              className="form-control bg-light border-0 small"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-* btn-search" type="submit">
              Search
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
        <div className="nav-item dropdown-center username ">
          <div
            className="data-toggle nav-link active username-item"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="namespace">UserName&nbsp;</span>
            <div>
              <FontAwesomeIcon icon={faUser} />
            </div>
          </div>
          <ul className="dropdown-menu">
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
