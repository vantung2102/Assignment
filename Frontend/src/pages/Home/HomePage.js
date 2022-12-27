import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import { Container, Row } from "react-bootstrap";
import PageHeader from "../../components/PageHeader/PageHeader";
import Node from "../../components/Home/Node";
import { ToastContainer } from "react-toastify";
import Home from "../../components/Home/Home";

const HomePage = () => {
  return (
    <MainWrapper>
      <Header />
      <Sidebar active="home" />

      <PageWrapper>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Home" />
            </Row>
          </div>
          <Home />
        </Container>
      </PageWrapper>

      <ToastContainer />
    </MainWrapper>
  );
};

export default HomePage;
