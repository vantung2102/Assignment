import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import { Container, Row } from "react-bootstrap";
import PageHeader from "../../components/PageHeader/PageHeader";
import Home from "../../components/Home/Home";
import { useSelector } from "react-redux";
import { isOpenSelector } from "../../features/sidebar/sidebarSlice";

const HomePage = () => {
  const isOpenSidebar = useSelector(isOpenSelector);

  return (
    <MainWrapper>
      <Header />
      <Sidebar active="home" />

      <PageWrapper isOpen={isOpenSidebar}>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Home" />
            </Row>
          </div>
          <Home />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default HomePage;
