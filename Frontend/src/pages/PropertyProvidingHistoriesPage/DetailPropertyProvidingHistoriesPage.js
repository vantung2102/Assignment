import React from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader/PageHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import DetailPropertyProvidingHistories from "../../components/Property/PropertyProvidingHistories/DetailPropertyProvidingHistories";
import { isOpenSelector } from "../../features/sidebar/sidebarSlice";
import { useSelector } from "react-redux";

const DetailPropertyProvidingHistoriesPage = () => {
  const { id } = useParams();
  const isOpenSidebar = useSelector(isOpenSelector);

  return (
    <MainWrapper>
      <Header />
      <Sidebar active="property_providing_histories" />
      <PageWrapper isOpen={isOpenSidebar}>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Detail Property Providing History" />
            </Row>
          </div>

          <DetailPropertyProvidingHistories idRequest={id} />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default DetailPropertyProvidingHistoriesPage;
