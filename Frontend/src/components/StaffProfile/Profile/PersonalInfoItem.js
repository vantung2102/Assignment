import React from "react";
import { Col, Row } from "react-bootstrap";

const PersonalInfoItem = ({ title, value }) => {
  return (
    <Row className="mb-3">
      <Col md={3}>{title}</Col>
      <Col md={9}>{value}</Col>
    </Row>
  );
};

export default PersonalInfoItem;
