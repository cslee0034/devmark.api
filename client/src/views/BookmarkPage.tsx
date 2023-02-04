import React from "react";
import { useParams } from "react-router-dom";
import Box from "../components/Box";
import BoxContent from "../components/BoxContent";
import Scrollback from "../utils/Scrollback";

const BookmarkPage = (): JSX.Element => {
  const { id } = useParams<string>();

  const mainContent = () => {
    if (id) {
      return <BoxContent boxId={id} />;
    }
    return <Box />;
  };

  return (
    <div className="mainpage-container">
      {mainContent()}
      <Scrollback />
    </div>
  );
};

export default BookmarkPage;
