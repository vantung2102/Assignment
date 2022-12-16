import React from "react";
import Container from "react-bootstrap/Container";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import StaffTable from "../../components/Staff/StaffTable";
import PageHeader from "../../components/PageHeader/PageHeader";

import { MainWrapper, PageWrapper } from "../../global/jsx/common";
import AddStaff from "../../components/Staff/AddStaff";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import { Row, Col } from "react-bootstrap";

const Staff = () => {
  return (
    <MainWrapper>
      <Header />
      <Sidebar />
      <PageWrapper>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Employee" />
              <AddStaff />
            </Row>
          </div>
          <StaffTable />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default Staff;
