import React from "react";
import { Link } from "react-router-dom";
import { Title } from "../404/notFound";

const Error = () => {
  return (
    <ErrorBox>
      <Title>500</Title>
      <h3>
        <AiFillWarning /> Oops! Something went wrong!
      </h3>
      <p>The page you requested was not found.</p>
      <Link className="btn btn-custom">Back to Home</Link>
    </ErrorBox>
  );
};

export default Error;
