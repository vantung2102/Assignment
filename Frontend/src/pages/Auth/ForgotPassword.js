import React from "react";
import { Container } from "react-bootstrap";
import {
  AccountContent,
  AccountLogo,
  AccountBox,
  AccountWrapper,
  AccountFooter,
} from "./login";

import logo from "../../assets/images/logo/logo.png";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <AccountContent>
      <Container>
        <AccountLogo>
          <img className="brand-logo" src={logo} alt=""></img>
        </AccountLogo>
        <AccountBox>
          <AccountWrapper>
            <h3 className="account-title">Forgot Password?</h3>
            <p className="account-subtitle">
              Enter your email to get a password reset link
            </p>

            <div>
              <form>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    className="form-control"
                    type="text"
                    autoComplete="false"
                  ></input>
                </div>

                <div className="form-group text-center">
                  <button className="btn btn-primary account-btn" type="submit">
                    Login
                  </button>
                </div>

                <AccountFooter>
                  <p>
                    Remember your password? <Link>Login</Link>
                  </p>
                </AccountFooter>
              </form>
            </div>
          </AccountWrapper>
        </AccountBox>
      </Container>
    </AccountContent>
  );
};

export default ForgotPassword;
