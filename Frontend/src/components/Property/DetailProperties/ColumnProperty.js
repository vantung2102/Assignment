import React from "react";
import { Col, Form } from "react-bootstrap";

const ColumnProperty = ({ title, value }) => {
  return (
    <Form.Group className="d-flex align-items-center mt-4">
      <Col md={2}>
        <Form.Label>{title}</Form.Label>
      </Col>
      <Col md={10}>
        <Form.Control defaultValue={value} disabled />
      </Col>
    </Form.Group>
  );
};

export default ColumnProperty;
