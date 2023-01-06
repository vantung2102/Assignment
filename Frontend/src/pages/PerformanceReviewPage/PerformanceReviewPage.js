import React from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader/PageHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import ReviewPerformance from "../../components/Performance/ReviewPerformance";

const PerformanceReviewPage = () => {
  return (
    <MainWrapper>
      <Header />
      <Sidebar active="review" />

      <PageWrapper>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Onboarding Sample" />
              {/* <AddOnboardingSampleStep /> */}
            </Row>
          </div>
          <ReviewPerformance />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default PerformanceReviewPage;
