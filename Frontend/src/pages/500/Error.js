import React from "react";
import { Title } from "../404/notFound";

const Error = () => {
  return (
    <ErrorBox>
      <Title>500</Title>
      <h3>
        <AiFillWarning /> Oops! Something went wrong!
      </h3>
      <p>The page you requested was not found.</p>
      <a className="btn btn-custom">Back to Home</a>
    </ErrorBox>
  );
};

export default Error;
