import axios, { AxiosResponse } from "axios";
import React, { useContext } from "react";
import { UserContext } from "../App";

/* Post Interface */
interface Post {
  Error: any;
  email: string;
  password: string;
}

interface Get {
  id: number;
}

const Login = (): JSX.Element => {
  const { setModalContent } = useContext(UserContext);
  const { setLoginContent } = useContext(UserContext);

  const loginClickHandeler = (e: any) => {
    e.preventDefault();
    /* Signin */
    signin(e);
  };

  /* Signin Function */
  const signin = async (e: any) => {
    try {
      await axios
        .post<Post>("/api/user/login", {
          email: e.target.Email.value,
          password: e.target.Password.value,
        })
        .then((res) => {
          if (res.data.Error) {
            setModalContent({
              header: "Login ERROR",
              message: res.data.Error,
              toggle: "view",
            });
          } else {
            window.location.replace("/");
          }
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
    <div className="login-wrapper mb-4">
      {/* Login Container */}
      <div className="login-container">
        {/* Header */}
        <h2 className="login-header">Welcome!</h2>
        {/* Email Form */}
        <form onSubmit={loginClickHandeler}>
          <input
            type="text"
            className="form-control"
            id="Email"
            placeholder="Email"
          />
          {/* Password Form */}
          <input
            type="password"
            className="form-control"
            id="Password"
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
          <button type="submit" className="login-button mt-2 mb-4">
            Login
          </button>
        </form>

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
