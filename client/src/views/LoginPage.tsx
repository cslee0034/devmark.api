import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const LoginPage = (): JSX.Element => {
  const { setLoggedIn } = useContext(UserContext);

  return (
    <div className="login-wrapper mb-4">
      <div className="login-container">
        <div className="mb-3 row">
          <h2 className="login-header">Welcome!</h2>
          <div>
            <input type="text" className="form-control" id="inputEmail" placeholder="Email"/>
          </div>
        </div>
        <div className="mb-3 row">
          <div>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Password"
            />
          </div>
        </div>
        <button className="login-button mb-4" onClick={() => setLoggedIn((prev: any) => !prev)}>Login</button>
       
        <hr className="sidebar-divider my-0 mb-4" />
       
        <button className="login-button mb-3">OAuth1</button>
        <button className="login-button mb-4">OAuth2</button>
       
        <hr className="sidebar-divider my-0 mb-4" />

        <Link to='/forget' className="guide">
          Forget password?
        </Link>

        <Link to='/register' className="guide">
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
