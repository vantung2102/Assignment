import React from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader/PageHeader";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import RequestProperty from "../../components/RequestProperty/RequestProperty";
import AddRequestProperty from "../../components/RequestProperty/AddRequestProperty";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";
import { isOpenSelector } from "../../features/sidebar/sidebarSlice";
import { useSelector } from "react-redux";

const RequestPropertyPage = () => {
  const isOpenSidebar = useSelector(isOpenSelector);

  return (
    <MainWrapper>
      <Header />
      <Sidebar active="request_properties" />
      <PageWrapper isOpen={isOpenSidebar}>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Request Properties" />
              <AddRequestProperty />
            </Row>
          </div>
          <RequestProperty />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default RequestPropertyPage;
