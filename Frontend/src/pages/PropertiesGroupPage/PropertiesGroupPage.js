import React from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";
import PropertiesGroup from "../../components/Property/PropertiesGroup/PropertiesGroup";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import PageHeader from "../../components/PageHeader/PageHeader";
import AddPropertiesGroup from "../../components/Property/PropertiesGroup/AddPropertiesGroup";
import Sidebar from "../../components/Sidebar/Sidebar";

const PropertiesGroupPage = () => {
  return (
    <MainWrapper>
      <Header />
      <Sidebar active="properties_group" />
      <PageWrapper>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Properties Group" />
              <AddPropertiesGroup />
            </Row>
          </div>
          <PropertiesGroup />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default PropertiesGroupPage;
