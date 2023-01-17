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
import { useForm } from "react-hook-form";
import { emailValidator, passwordValidator } from "../../validators/validators";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    dispatch(login({ email: watch("gmail"), password: watch("password") }));
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

            <form onSubmit={handleSubmit(handleLogin)}>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  defaultValue={getValues("gmail")}
                  {...register("gmail", {
                    required: "Email Address is required",
                    pattern: {
                      value: emailValidator.pattern,
                      message: emailValidator.message,
                    },
                  })}
                />
                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.gmail?.message}
                </Form.Control.Feedback>

                <small></small>
              </Form.Group>

              <Form.Group>
                <Row>
                  <Col>
                    <Form.Label>Password</Form.Label>
                  </Col>
                </Row>
                <div className="pass-group">
                  <Form.Control
                    type="password"
                    defaultValue={getValues("password")}
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value: passwordValidator.pattern,
                        message: passwordValidator.message,
                      },
                    })}
                  />
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors.password?.message}
                  </Form.Control.Feedback>
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
