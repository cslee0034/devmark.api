import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosResponse } from "axios";
import React, { FC, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ModalContext } from "../App";
import Search from "../utils/Search";

// Interfaces
interface Get {
  Error: any;
  box: string;
  img: string;
  length: number;
  i: number;
  [index: number]: any;
  boxId: string;
  memoArr: any;

  memoName: string;
  memoContent: string;
}

interface P {}

const FeedView: FC<P> = (props: P): JSX.Element => {
  return (
    <>
      {/* Header */}
      <h3 className="main-header">
        <div className="main-header-right">Feed</div>
        <div className="main-header-left">
          <Search search="" />
        </div>
      </h3>
      <div className="edit-feed-container">
        <Link to="/feeds/newfeed">
          <button type="button" className="btn btn-secondary feed-edit">
            Edit Feed
          </button>
        </Link>
      </div>

      {/* Cards */}
      <div className="card mb-3 card-wrapper">
        <div className="feed-row row g-0">
          <div className="feed-col col-md-4">
            <img
              src="https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png"
              className="img-fluid rounded-start feed-img"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <p className="card-text">
                <h4>Text Header</h4>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <div className="card-text-like">
                <button className="card-text-like-button">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="feed-button-container mb-3">
        <button type="button" className="btn btn-outline-secondary">
          {"<"}
        </button>
        <button type="button" className="btn btn-outline-secondary">
          {"..."}
        </button>
        <button type="button" className="btn btn-outline-secondary">
          {">"}
        </button>
      </div>
    </>
  );
};

export default FeedView;
