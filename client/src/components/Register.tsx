import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import Modal from "../utils/Modal";

interface Post {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

interface Modal {
  header: string;
  message: string;
  toggle: any;
}

/* Modal Message Content*/
let messageContent = "";
let headerContent = "";

/* Email Check Reg*/
function email_check(email: string) {
  var reg =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return reg.test(email);
}

const Register = (): JSX.Element => {
  /* Modal View Toggle */
  const [viewModal, setViewModal] = useState("");

  /* Register Scripts */
  const registerClickHandeler = (e: any) => {
    e.preventDefault();
    /* Email Check */
    if (!email_check(e.target.Email.value)) {
      headerContent = "Email ERROR";
      messageContent = "check your email again";
      setViewModal("view");
      return;
    }

    /* Password Check */
    if (
      e.target.Password.value !== "" &&
      e.target.Password.value !== e.target.ConfirmPassword.value
    ) {
      headerContent = "Password ERROR";
      messageContent = "password do not match";
      setViewModal("view");
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
    <div className="login-wrapper mb-4">
      {viewModal === "view" ? (
        <Modal
          message={messageContent}
          toggle={setViewModal}
          header={headerContent}
        />
      ) : null}
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
