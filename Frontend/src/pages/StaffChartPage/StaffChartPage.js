import React from "react";
import { Container, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader/PageHeader";
import AddPosition from "../../components/Position/AddPosition";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";

const StaffChartPage = () => {
  return (
    <MainWrapper>
      <Header />
      <Sidebar active="staffChart" />

      <PageWrapper>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="home" />
              <AddPosition />
            </Row>
          </div>
          <Position />
        </Container>
      </PageWrapper>

      <ToastContainer />
    </MainWrapper>
  );
};

export default StaffChartPage;
