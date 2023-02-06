import React from "react";
import { useParams } from "react-router-dom";
import FeedView from "../components/FeedView";
import EditFeed from "../utils/EditFeed";

const FeedPage = (): JSX.Element => {
  const { feed_id } = useParams<string>();

  return <>{feed_id === "newfeed" ? <EditFeed /> : <FeedView />}</>;
};

export default FeedPage;
