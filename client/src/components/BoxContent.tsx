import axios, { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ModalContext } from "../App";
import Bookmark from "../utils/Bookmark";
import Search from "../utils/Search";

interface Get {
  Error: any;
  box: string;
  img: string;
  length: number;
  i: number;
  [index: number]: any;
}

const BoxContent = (): JSX.Element => {
  const { setModalContent } = useContext(ModalContext);

  const temp = ""

  return (
    <>
      {/* Header */}
      <h3 className="main-header">
        <div className="main-header-right">Bookmark</div>
        <div className="main-header-left">
          <Search search="" />
        </div>
      </h3>

      {/* Content */}
      <Bookmark temp={temp}/>

      {/* New */}
      <div className="card bookmark-card">
      <div className="bookmark-card-header">
        <div className="bookmark-card-header-left">
        <button className="bookmark-menu">Add New Bookmark</button>
        </div>

        <div className="bookmark-card-header-right">
          <div className="bookmark-placeholder"/>
        </div>
      </div>
    </div>
    </>
  );
};

export default BoxContent;
