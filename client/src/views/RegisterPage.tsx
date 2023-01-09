import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const RegisterPage = (): JSX.Element => {
  const { setLoggedIn } = useContext(UserContext);

  return (
    // Login wrapper
    <div className="login-wrapper mb-4">
      {/* Login Container */}
      <div className="login-container">
        <div className="mb-3 row">
          {/* Header */}
          <h2 className="login-header">Register</h2>
          {/* Email Form */}
          <div>
            <input
              type="text"
              className="form-control"
              id="inputEmail"
              placeholder="Email"
            />
          </div>
        </div>
        <div className="mb-3 row">
          {/* Password Form */}
          <div>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="mb-3 row">
          {/* Password Form */}
          <div>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Confirm Password"
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          className="login-button mb-4">
            Register
        </button>

        {/* Divider */}
        <hr className="sidebar-divider my-0 mb-4" />

        {/* OAuth1 */}
        <button className="login-button mb-3">OAuth1</button>

        {/* OAuth2 */}
        <button className="login-button mb-4">OAuth2</button>

        {/* Divider */}
        <hr className="sidebar-divider my-0 mb-4" />

        {/* Forger Password */}
        <Link to="/forget" className="guide">
          Forget password?
        </Link>

        {/* Register */}
        <Link to="/login" className="guide">
          Already have and account
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
