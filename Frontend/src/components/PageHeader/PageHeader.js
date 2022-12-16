import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Col from "react-bootstrap/Col";
import { PageTitle } from "./pageHeader";

const PageHeader = (props) => {
  return (
    <Col>
      <PageTitle>{props.title}</PageTitle>
      <Breadcrumb>
        <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item active href="#">
          {props.title}
        </Breadcrumb.Item>
      </Breadcrumb>
    </Col>
  );
};

export default PageHeader;
