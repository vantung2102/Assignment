import React from "react";
import { AiFillWarning } from "react-icons/ai";
import { Link } from "react-router-dom";

import { ErrorBox, Title } from "./notFound";

const NotFound = () => {
  return (
    <ErrorBox>
      <Title>404</Title>
      <h3>
        <AiFillWarning /> Oops! Page not found!
      </h3>
      <p>The page you requested was not found.</p>
      <Link className="btn btn-custom">Back to Home</Link>
    </ErrorBox>
  );
};

export default NotFound;
