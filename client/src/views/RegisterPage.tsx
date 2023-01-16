import axios, { AxiosResponse } from "axios";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

interface Get {
  test: string;
}

interface Post {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

const RegisterPage = (): JSX.Element => {
  const RegisterClickHandeler = (e: any) => {
    e.preventDefault();
    signup(e);
  };

  const signup = async (e: any) => {
    try {
      await axios
        .post<Post>("/auth", {
          email: e.target.Email.value,
          password: e.target.Password.value,
          confirmPassword: e.target.ConfirmPassword.value,
          nickname: e.target.Nickname.value,
        })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          (error.response as AxiosResponse<{ message: string }>)?.data.message
        );
      } else {
        console.error(error);
      }
    }
  };

  return (
    // Login wrapper
    <div className="login-wrapper mb-4">
      {/* Login Container */}
      <div className="login-container">
        {/* Header */}
        <h2 className="login-header">Register</h2>
        <form onSubmit={RegisterClickHandeler}>
          {/* Email Form */}
          <input
            type="text"
            className="form-control"
            id="Email"
            placeholder="Email"
          />
          {/* Password Form */}
          <input
            type="text"
            className="form-control"
            id="Password"
            placeholder="Password"
          />
          {/* Password Form */}
          <input
            type="text"
            className="form-control"
            id="ConfirmPassword"
            placeholder="Confirm Password"
          />
          {/* Nickname Form */}
          <input
            type="nickname"
            className="form-control"
            id="Nickname"
            placeholder="Nickname"
          />
          {/* Login Button */}
          <button type="submit" className="login-button mb-4">
            Register
          </button>
        </form>

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
