import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const AuthPage = (): JSX.Element => {
  const [page, setPage] = useState(true);

  const togglePage = () => {
    setPage((page) => !page);
  };

  function View() {
    if (page === true) {
      return (
        <>
          <Login />
          {/* To register */}
          <div className="account-toggle" role="button" onClick={togglePage}>
            Create Account
          </div>
          <div className="mb-5" />
        </>
      );
    } else {
      return (
        <>
          <Register />
          {/* To login */}
          <div className="account-toggle" role="button" onClick={togglePage}>
            Already have an account
          </div>
          <div className="mb-5" />
        </>
      );
    }
  }

  return View();
};

export default AuthPage;
