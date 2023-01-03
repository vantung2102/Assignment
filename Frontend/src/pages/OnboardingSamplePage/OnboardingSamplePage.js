import React from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader/PageHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import OnboardingSampleStep from "../../components/OnboardingSampleStep/OnboardingSampleStep";
import AddOnboardingSampleStep from "../../components/OnboardingSampleStep/AddOnboardingSampleStep";

const OnboardingSamplePage = () => {
  return (
    <MainWrapper>
      <Header />
      <Sidebar active="onboarding_sample" />

      <PageWrapper>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Onboarding Sample" />
              <AddOnboardingSampleStep />
            </Row>
          </div>
          <OnboardingSampleStep />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default OnboardingSamplePage;
