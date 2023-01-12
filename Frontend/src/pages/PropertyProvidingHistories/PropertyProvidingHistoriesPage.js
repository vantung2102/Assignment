import React from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader/PageHeader";
import PropertyProvidingHistories from "../../components/Property/PropertyProvidingHistories/PropertyProvidingHistories";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import { isOpenSelector } from "../../features/sidebar/sidebarSlice";
import { useSelector } from "react-redux";

const PropertyProvidingHistoriesPage = () => {
  const isOpenSidebar = useSelector(isOpenSelector);

  return (
    <MainWrapper>
      <Header />
      <Sidebar active="property_providing_histories" />
      <PageWrapper isOpen={isOpenSidebar}>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Property Providing Histories" />
            </Row>
          </div>
          <PropertyProvidingHistories />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default PropertyProvidingHistoriesPage;
