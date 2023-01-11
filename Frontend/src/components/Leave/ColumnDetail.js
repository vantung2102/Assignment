import React from "react";
import { Col, Form } from "react-bootstrap";

export const ColumnDetail = ({ title, value, disabled }) => {
  return (
    <Form.Group className="d-flex align-items-center mt-4">
      <Col md={2}>
        <Form.Label>{title}</Form.Label>
      </Col>
      <Col md={10}>
        <Form.Control defaultValue={value} disabled={disabled} />
      </Col>
    </Form.Group>
  );
};

export const ColumnDetailType = ({ title, value, defaultValue }) => {
  return (
    <Form.Group className="d-flex align-items-center mt-4">
      <Col md={2}>
        <Form.Label>{title}</Form.Label>
      </Col>
      <Col md={10}>
        {value}/<span className="text-danger">{defaultValue}</span>
      </Col>
    </Form.Group>
  );
};
