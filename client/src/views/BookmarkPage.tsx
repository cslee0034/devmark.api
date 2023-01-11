import React from "react";

const BookmarkPage = (): JSX.Element => {
  return (
    <div className="bookmarkpage-container">
      {/* Header */}
      <h3 className="bookmark-header">Bookmark</h3>

      {/* Content */}
      <div className="row row-cols-1 row-cols-md-4 g-4 mb-4 card-container">
        <div className="col">
          <div className="card h-100">
            <img
              src={`${process.env.PUBLIC_URL}/images/vanilla_js.png`}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">#javascript</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img
              src={`${process.env.PUBLIC_URL}/images/Frontpage-background.png`}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">#algorithm</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img
              src={`${process.env.PUBLIC_URL}/images/python.png`}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">#python</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img
              src={`${process.env.PUBLIC_URL}/images/Node.js.png`}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">#nodejs</h5>
            </div>
          </div>
        </div>
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
          <button type="button" className="btn btn-outline-secondary none-border-left">
            1
          </button>
          <button type="button" className="btn btn-outline-secondary none-border-left">
            2
          </button>
          <button type="button" className="btn btn-outline-secondary none-border-left">
            3
          </button>
          <button type="button" className="btn btn-outline-secondary none-border-left">
            4
          </button>
          <button type="button" className="btn btn-outline-secondary none-border-both">
            5
          </button>
          <button type="button" className="btn btn-outline-secondary">
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookmarkPage;
