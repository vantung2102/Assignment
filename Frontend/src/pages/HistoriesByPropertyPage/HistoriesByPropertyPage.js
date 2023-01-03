import React from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader/PageHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import HistoriesByProperty from "../../components/Property/PropertyProvidingHistories/HistoriesByProperty";

const HistoriesByPropertyPage = () => {
  const { id } = useParams();

  return (
    <MainWrapper>
      <Header />
      <Sidebar active="properties" />
      <PageWrapper>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="History Property" />
            </Row>
          </div>

          <HistoriesByProperty idRequest={id} />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default HistoriesByPropertyPage;
