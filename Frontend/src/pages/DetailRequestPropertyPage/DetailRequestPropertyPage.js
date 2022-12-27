import React from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader/PageHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import { useParams } from "react-router-dom";
import DetailRequestProperty from "../../components/RequestProperty/DetailRequestProperty";

const DetailRequestPropertyPage = () => {
  const { id } = useParams();

  return (
    <MainWrapper>
      <Header />
      <Sidebar active="request_properties" />
      <PageWrapper>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Detail Request Property" />
            </Row>
          </div>

          <DetailRequestProperty idRequest={id} />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default DetailRequestPropertyPage;
