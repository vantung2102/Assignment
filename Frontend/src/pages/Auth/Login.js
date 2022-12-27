import React, { useEffect, useState } from "react";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  AccountContent,
  AccountLogo,
  AccountBox,
  AccountWrapper,
} from "./login";

import logo from "../../assets/images/logo/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { login, isAuthenticatedSelector } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [eye, setEye] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(isAuthenticatedSelector);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/staff_management/departments", { replace: true });
    }
  }, [isAuthenticated]);

  const handleClickEye = () => {
    eye === "password" ? setEye("text") : setEye("password");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
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

            <form onSubmit={handleLogin}>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></Form.Control>
                <small></small>
              </Form.Group>

              <Form.Group>
                <Row>
                  <Col>
                    <Form.Label>Password</Form.Label>
                  </Col>
                  <Col className="col-auto">
                    <Link className="text-muted">Forgot password?</Link>
                  </Col>
                </Row>
                <div className="pass-group">
                  <Form.Control
                    type={eye}
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>

                  <span className="eye-slash" onClick={handleClickEye}>
                    {eye === "password" ? (
                      <AiFillEyeInvisible />
                    ) : (
                      <AiFillEye />
                    )}
                  </span>
                </div>
                <small></small>
              </Form.Group>

              <Form.Group className="text-center">
                <Button className="account-btn" type="submit">
                  Login
                </Button>
              </Form.Group>
            </form>
          </AccountWrapper>
        </AccountBox>
      </Container>
    </AccountContent>
  );
};

export default Login;
