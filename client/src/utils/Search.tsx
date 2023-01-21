import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useContext } from "react";

interface P {
  header: string;
  message: string;
  toggle: any;
}

const Modal: FC<P> = (props: P): JSX.Element => {
  return (
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
  );
};
