import React from "react";
import Pagination from "react-bootstrap/Pagination";
import "./paginate.scss";

const Paginate = (props) => {
  console.log(props);
  return (
    <Pagination className="d-flex justify-content-end">
      <Pagination.First />
      <Pagination.Prev disabled />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Item active>{2}</Pagination.Item>
      <Pagination.Item>{3}</Pagination.Item>

      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
};

export default Paginate;
