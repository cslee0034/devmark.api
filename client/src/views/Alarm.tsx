import React from "react";
import Scrollback from "../utils/Scrollback";

const AlarmPage = (): JSX.Element => {
  return (
    <div className="mainpage-container">
      {/* Header */}
      <h3 className="main-header">Alarm</h3>

      {/* Content */}
      <div className="card tils-card">
        <div className="card-header">2023-01</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">05</li>
          <li className="list-group-item">04</li>
          <li className="list-group-item">03</li>
          <li className="list-group-item">02</li>
          <li className="list-group-item">01</li>
        </ul>
      </div>

      {/* Button */}

      <div
        className="btn-toolbar mb-3"
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
        <div className="btn-group me-2" role="group" aria-label="First group">
          <button type="button" className="btn btn-outline-secondary">
            {"<"}
          </button>
          <button type="button" className="btn btn-outline-secondary disabled btn-center-disable">
            &nbsp;&nbsp;
          </button>
          <button type="button" className="btn btn-outline-secondary">
            {">"}
          </button>
        </div>
      </div>
      <Scrollback />
    </div>
    
  );
};

export default AlarmPage;
