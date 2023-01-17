import React from "react";
import Modal from "../utils/Modal";

const Login = (): JSX.Element => {
  return (
    <div className="login-wrapper mb-4">
      {/* Login Container */}
      <div className="login-container">
        {/* Header */}
        <h2 className="login-header">Welcome!</h2>
        {/* Email Form */}
        <input
          type="text"
          className="form-control"
          id="inputEmail"
          placeholder="Email"
        />
        {/* Password Form */}
        <input
          type="password"
          className="form-control"
          id="inputPassword"
          placeholder="Password"
        />
        {/* Remember Me */}
        <div className="form-check mb-3 remember-me">
          <input
            className="form-check-input remember-me-button"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label className="form-check-label">Remember me</label>
        </div>
        {/* Login Button */}
        <button className="login-button mb-4">Login</button>

        {/* Divider */}
        <hr className="sidebar-divider my-0 mb-4" />

        {/* OAuth1 */}
        <button className="login-button mb-3">OAuth1</button>

        {/* OAuth2 */}
        <button className="login-button mb-4">OAuth2</button>

        {/* Divider */}
        <hr className="sidebar-divider my-0 mb-2" />
      </div>
    </div>
  );
};

export default Login;
