import React from "react";
import { Container, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import AddDepartment from "../../components/Department/AddDepartment";
import Department from "../../components/Department/Department";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader/PageHeader";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";

import Sidebar from "../../components/Sidebar/Sidebar";
import { PageWrapper } from "../../global/jsx/common";

const DepartmentPage = () => {
  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar active="department" />

      <PageWrapper>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Department" />
              <AddDepartment />
            </Row>
          </div>
          <Department />
        </Container>
      </PageWrapper>

      <ToastContainer />
    </div>
  );
};

export default DepartmentPage;
