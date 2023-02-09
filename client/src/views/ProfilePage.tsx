import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";
import ProfilePage from "../components/pages/Profile";

const FeedPage = (): JSX.Element => {
  const { user_id } = useParams<string>();
  const { loginContent } = useContext(UserContext);

  return <>{loginContent.loggedIn ? <ProfilePage /> : null}</>;
};

export default FeedPage;
