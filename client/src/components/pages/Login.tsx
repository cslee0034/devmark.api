import axios, { AxiosResponse } from "axios";
import React, { useContext } from "react";
import { ModalContext, UserContext } from "../../App";

// Interfaces
interface Post {
  Error: any;
  email: string;
  password: string;
  json: object;
}

interface Get {
  Error: any;
  id: number;
  nick: string;
  Boxes: any;
}

// React Start from here
const Login = (): JSX.Element => {
  //--------------------------------------------------------
  // Declaration of useState, useContext, useRef ...

  const { setModalContent } = useContext(ModalContext);
  const { setLoginContent } = useContext(UserContext);

  //--------------------------------------------------------
  // Event Handler

  /* <Event Handler> - loginClickHandeler */
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* Signin */
    const errored = await login(e);
    /* Login */
    if (!errored) {
      await getInfo(e);
    }
  };

  //--------------------------------------------------------
  // Axios Request

  /* <Axios Request> - Login Axios Post /api/user/login */
  const login = async (e: any) => {
    try {
      await axios
        .post<Post>("/api/user/login", {
          email: e.target.Email.value,
          password: e.target.Password.value,
        })
        .then((res) => {});
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error(
          (error.response as AxiosResponse<{ message: string }>)?.data.message
        );
      } else {
        console.error(error);
      }
      if (error.response.data.Error) {
        setModalContent({
          header: "Login ERROR",
          message: error.response.data.Error,
          toggle: "view",
        });
      }
      return true;
      // 오류 난다면 errored = true 리턴
      // handleLogin 다음 동작을 방지한다
    }
  };

  /* <Axios Request> - Login Axios Get /api/info */
  const getInfo = async (e: any) => {
    try {
      await axios.get<Get>("/api/info").then((res) => {
        /* Remember == true일때 localStorage에 저장 */
        if (e.target.Remember.checked) {
          const UserId = String(res.data.id);
          const UserNick = String(res.data.nick);
          window.localStorage.setItem("userId", UserId);
          window.localStorage.setItem("userNick", UserNick);
          window.sessionStorage.setItem("local", "true");

          window.location.replace("/");
        } else {
          /* Remember == false일때 sessionStorage에 저장 */
          const UserId = String(res.data.id);
          const UserNick = String(res.data.nick);
          window.sessionStorage.setItem("userId", UserId);
          window.sessionStorage.setItem("userNick", UserNick);
          window.sessionStorage.setItem("local", "true");

          window.location.replace("/");
        }
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error(
          (error.response as AxiosResponse<{ message: string }>)?.data.message
        );
      } else {
        console.error(error);
      }
      if (error.response.data.Error) {
        setModalContent({
          header: "ERROR",
          message: error.response.data.Error,
          toggle: "view",
        });
      }
    }
  };

  //--------------------------------------------------------
  // return

  return (
    <div className="login-wrapper mb-4">
      {/* Login Container */}
      <div className="login-container">
        {/* Header */}
        <h2 className="login-header">Welcome!</h2>
        {/* Email Form */}
        <form onSubmit={handleLogin}>
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
        <a href="http://localhost:5000/api/user/kakao">
          <button className="kakao-container mb-3">
            <img
              className="kakao-login"
              src={`${process.env.PUBLIC_URL}/images/kakao_login.png`}
            ></img>
          </button>
        </a>

        {/* OAuth2 */}
        <a href="http://localhost:5000/api/user/github">
          <button className="github-container mb-3">
            <img
              className="github-login"
              src={`${process.env.PUBLIC_URL}/images/github_login.png`}
            ></img>
          </button>
        </a>

        {/* Divider */}
        <hr className="sidebar-divider my-0 mb-2" />
      </div>
    </div>
  );
};

export default Login;
