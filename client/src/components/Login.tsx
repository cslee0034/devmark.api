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
  nick: string;
}

const Login = (): JSX.Element => {
  const { setModalContent } = useContext(UserContext);

  const loginClickHandeler = async (e: any) => {
    e.preventDefault();
    /* Signin */
    await signin(e);
    /* Login */
    await loginAPI(e);
    window.location.replace("/");
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

  /* LoginAPI */
  const loginAPI = async (e: any) => {
    try {
      await axios.get<Get>("/api/info").then((res) => {
        /* Remember == true일때 localStorage에 저장 */
        if (e.target.Remember.checked) {
          const UserId = String(res.data.id);
          const UserNick = String(res.data.nick);
          window.localStorage.setItem("userId", UserId);
          window.localStorage.setItem("userNick", UserNick);
        } else {
          /* Remember == false일때 sessionStorage에 저장 */
          const UserId = String(res.data.id);
          const UserNick = String(res.data.nick);
          window.sessionStorage.setItem("userId", UserId);
          window.sessionStorage.setItem("userNick", UserNick);
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
              id="Remember"
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
        <button className="kakao-container mb-3">
          <img
            className="kakao-login"
            src={`${process.env.PUBLIC_URL}/images/kakao_login.png`}
          ></img>
        </button>

        {/* OAuth2 */}
        <button className="github-container mb-3">
          <img
            className="github-login"
            src={`${process.env.PUBLIC_URL}/images/github_login.png`}
          ></img>
        </button>

        {/* Divider */}
        <hr className="sidebar-divider my-0 mb-2" />
      </div>
    </div>
  );
};

export default Login;
