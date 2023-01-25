import React from "react";
import Box from "../components/Box";
import Scrollback from "../utils/Scrollback";
import Search from "../utils/Search";

const BookmarkPage = (): JSX.Element => {
  return (
    <div className="mainpage-container">
      {/* Header */}
      <h3 className="main-header">
        <div className="main-header-right">Bookmark</div>
        <div className="main-header-left">
          <Search search="" />
        </div>
      </h3>

      {/* Content */}
      {/* 
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
              src={`${process.env.PUBLIC_URL}/images/add-item.png`}
              className="card-img-add"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Add Box</h5>
            </div>
          </div>
        </div>
      </div>
      */}
      <Box />
      <Scrollback />
    </div>
  );
};

export default BookmarkPage;
