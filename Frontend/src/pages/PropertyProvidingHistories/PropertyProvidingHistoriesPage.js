import React from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader/PageHeader";
import AddPropertyProvidingHistories from "../../components/Property/PropertyProvidingHistories/AddPropertyProvidingHistories";
import PropertyProvidingHistories from "../../components/Property/PropertyProvidingHistories/PropertyProvidingHistories";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";

const PropertyProvidingHistoriesPage = () => {
  return (
    <MainWrapper>
      <Header />
      <Sidebar active="property_providing_histories" />
      <PageWrapper>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Property Providing Histories" />
              <AddPropertyProvidingHistories />
            </Row>
          </div>
          <PropertyProvidingHistories />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default PropertyProvidingHistoriesPage;
