import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Search from "../utils/Search";

const FeedPage = (): JSX.Element => {
  return (
    <>
      {/* Header */}
      <h3 className="main-header">
        <div className="main-header-right">Feed</div>
        <div className="main-header-left">
          <Search search="" />
        </div>
      </h3>

      {/* Cards */}
      <div className="card mb-3 card-wrapper">
        <div className="row g-0">
          <div className="col-md-4">
            <img src="..." className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <p className="card-text">
                <h4>
                  Text Header
                </h4>
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
    </>
  );
};

export default FeedPage;
