import React, { useEffect } from "react";

import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  isAuthenticatedSelector,
} from "../../features/auth/authSlice";

const RequireAuth = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  let isAuthenticatedLocal = localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    dispatch(getUser());
    isAuthenticatedLocal = localStorage.getItem("isAuthenticated");
  }, [isAuthenticated]);

  return isAuthenticatedLocal ? <>{children}</> : <Navigate to="/login" />;
};

export default RequireAuth;
