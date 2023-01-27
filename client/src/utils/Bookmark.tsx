import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { FC } from "react";
interface P {
  temp: string;
}

const Bookmark: FC<P> = (props: P): JSX.Element => {
  return (
    // Content
    <div className="card bookmark-card">
      <div className="bookmark-card-header">
        <div className="bookmark-card-header-left">
          <button className="bookmark-menu">Bookmark1</button>
        </div>

        <div className="bookmark-card-header-right">
          <div className="dropdown">
            <button
              className="bookmark-menu btn data-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>

            <ul className="dropdown-menu bookmark-dropdown">
              <li>
                <a className="dropdown-item" href="#">
                  hi
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Memo &nbsp;
                  <FontAwesomeIcon icon={faPlus} />
                </a>
              </li>
            </ul>
          </div>

          <button className="bookmark-menu">
            <FontAwesomeIcon icon={faClock} />
          </button>
          <button className="bookmark-menu">
            <FontAwesomeIcon icon={faWrench} />
          </button>
          <button className="bookmark-menu">
            <FontAwesomeIcon icon={faBan} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
