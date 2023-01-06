import React from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader/PageHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import AdminPerformance from "../../components/Performance/AdminPerformance";
import AddPerformance from "../../components/Performance/AddPerformance";

const Performance = () => {
  return (
    <MainWrapper>
      <Header />
      <Sidebar active="performance" />

      <PageWrapper>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Performance" />
              <AddPerformance />
            </Row>
          </div>
          <AdminPerformance />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default Performance;
