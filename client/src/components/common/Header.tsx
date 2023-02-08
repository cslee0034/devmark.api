import React, { FC } from "react";
import Search from "../../utils/Search";

interface P {
  header: string;
  search: boolean;
}

// React Start from here
const Header: FC<P> = (props: P): JSX.Element => {
  //--------------------------------------------------------
  // return

  return (
    <>
      <h3 className="main-header">
        <div className="main-header-right">{props.header}</div>
        <div className="main-header-left">
          {props.search ? <Search search="" /> : null}
        </div>
      </h3>
    </>
  );
};

export default Header;
