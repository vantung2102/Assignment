import React from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import PageHeader from "../../components/PageHeader/PageHeader";
import Performance from "../../components/Performance/Performance";

const PerformanceSelfReviewPage = () => {
  return (
    <MainWrapper>
      <Header />
      <Sidebar active="self_review" />

      <PageWrapper>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Onboarding Sample" />
              {/* <AddOnboardingSampleStep /> */}
            </Row>
          </div>
          <Performance />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default PerformanceSelfReviewPage;
