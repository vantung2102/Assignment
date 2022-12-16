import React from "react";
import { AiFillWarning } from "react-icons/ai";

import { ErrorBox, Title } from "./notFound";

const NotFound = () => {
  return (
    <ErrorBox>
      <Title>404</Title>
      <h3>
        <AiFillWarning /> Oops! Page not found!
      </h3>
      <p>The page you requested was not found.</p>
      <a className="btn btn-custom">Back to Home</a>
    </ErrorBox>
  );
};

export default NotFound;
