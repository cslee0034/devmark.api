import axios, { AxiosResponse } from "axios";
import React, { useContext } from "react";
import { UserContext } from "../App";

/* Post Interface */
interface Post {
  Error: any;
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

/* Email Check Reg*/
function email_check(email: string) {
  var reg =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return reg.test(email);
}

const Register = (): JSX.Element => {
  /* Modal View Toggle */
  const { setModalContent } = useContext(UserContext);

  /* Register Scripts */
  const registerClickHandeler = (e: any) => {
    e.preventDefault();

    /* Email Check */
    if (!email_check(e.target.Email.value)) {
      setModalContent({
        header: "Email ERROR",
        message: "check your email again",
        toggle: "view",
      });
      return;
    }

    /* Password Check */
    if (e.target.Password.value == "") {
      setModalContent({
        header: "Password ERROR",
        message: "enter password please",
        toggle: "view",
      });
      return;
    } else if (e.target.Password.value !== e.target.ConfirmPassword.value) {
      setModalContent({
        header: "Password ERROR",
        message: "password do not match",
        toggle: "view",
      });
      return;
    }

    /* Nickname Check */
    if (e.target.Nickname.value == "") {
      setModalContent({
        header: "Nickname ERROR",
        message: "enter your nickname please",
        toggle: "view",
      });
      return;
    }

    /* Signup */
    signup(e);
  };

  /* Signup Function */
  const signup = async (e: any) => {
    try {
      await axios
        .post<Post>("api/user/registration", {
          email: e.target.Email.value,
          nick: e.target.Nickname.value,
          password: e.target.Password.value,
        })
        .then((res) => {
          if (res.data.Error) {
            setModalContent({
              header: "Register ERROR",
              message: res.data.Error,
              toggle: "view",
            });
          } else {
            window.location.replace("/auth");
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
        <h2 className="login-header">Register</h2>
        <form onSubmit={registerClickHandeler}>
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
          <button type="submit" className="login-button mt-2 mb-4">
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
        <hr className="sidebar-divider my-0 mb-2" />
      </div>
    </div>
  );
};

export default Register;
