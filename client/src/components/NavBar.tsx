import React, { FC, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

interface P {
  loggedIn: boolean;
}

const NavBar: FC<P> = (props: P): JSX.Element => {
  const { setSidebar } = useContext(UserContext);
  const { setLoggedIn } = useContext(UserContext);

  return (
    // Navbar
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-2 static-top shadow">
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
          <button className="nav-item position-relative notification">
            <FontAwesomeIcon icon={faBell} />
            {props.loggedIn ? (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                4+
                <span className="visually-hidden">unread messages</span>
              </span>
            ) : null}
          </button>

        {/* BlockBar */}
        <div className="vr m-2"></div>

        {/* Dropdown UserName */}
        {props.loggedIn ? (
          <div className="btn-group username">
            <button
              type="button"
              className="btn data-toggle username-item"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              aria-expanded="false"
            >
              <div>
                <span className="namespace">UserName&nbsp;</span>
                <FontAwesomeIcon icon={faUser} />
              </div>
            </button>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
              <li>
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/profile" className="dropdown-item">
                  Setting
                </Link>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => setLoggedIn((prev: any) => !prev)}
                  href="/"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="btn-group username">
            <Link
              to="/auth"
              type="button"
              className="btn data-toggle username-item"
              data-bs-display="static"
              aria-expanded="false"
            >
              <div>
                <FontAwesomeIcon icon={faUser} />
              </div>
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
