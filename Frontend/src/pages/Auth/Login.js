import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  AccountContent,
  AccountLogo,
  AccountBox,
  AccountWrapper,
} from "./login";

import logo from "../../assets/images/logo/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector } from "../../features/auth/authSlice";

const Login = () => {
  const [eye, setEye] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = useSelector(loginSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginAsync(email, password));
  });
  const handleClickEye = () => {
    eye === "password" ? setEye("text") : setEye("password");
  };

  return (
    <AccountContent>
      <Container>
        <AccountLogo>
          <img className="brand-logo" src={logo} alt=""></img>
        </AccountLogo>
        <AccountBox>
          <AccountWrapper>
            <h3 className="account-title">Hello! let's get started</h3>
            <p className="account-subtitle">Sign in to continue.</p>

            <div>
              <form>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    className="form-control"
                    type="text"
                    autoComplete="false"
                    value={email}
                  ></input>
                  <small></small>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label>Password</label>
                    </div>
                    <div className="col-auto">
                      <a className="text-muted">Forgot password?</a>
                    </div>
                  </div>
                  <div className="pass-group">
                    <input
                      type={eye}
                      className="form-control"
                      autoComplete="false"
                      value={password}
                    ></input>
                    <span className="fa eye-slash" onClick={handleClickEye}>
                      {eye === "password" ? (
                        <AiFillEyeInvisible />
                      ) : (
                        <AiFillEye />
                      )}
                    </span>
                  </div>
                  <small></small>
                </div>

                <div className="form-group text-center">
                  <button className="btn btn-primary account-btn" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </AccountWrapper>
        </AccountBox>
      </Container>
    </AccountContent>
  );
};

export default Login;
