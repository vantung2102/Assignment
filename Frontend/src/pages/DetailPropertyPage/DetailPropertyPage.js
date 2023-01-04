import React from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader/PageHeader";
import DetailProperties from "../../components/Property/DetailProperties/DetailProperties";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";

const DetailPropertyPage = () => {
  const { id } = useParams();

  return (
    <MainWrapper>
      <Header />
      <Sidebar active="properties" />
      <PageWrapper>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Detail Property" />
            </Row>
          </div>

          <DetailProperties idRequest={id} />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default DetailPropertyPage;
