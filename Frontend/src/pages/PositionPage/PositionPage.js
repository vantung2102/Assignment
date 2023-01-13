import React from "react";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";
import PageHeader from "../../components/PageHeader/PageHeader";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Container, Row } from "react-bootstrap";
import AddPosition from "../../components/Position/AddPosition";
import Position from "../../components/Position/Position";
import { ToastContainer } from "react-toastify";
import { isOpenSelector } from "../../features/sidebar/sidebarSlice";
import { useSelector } from "react-redux";

const PositionPage = () => {
  const isOpenSidebar = useSelector(isOpenSelector);

  return (
    <MainWrapper>
      <Header />
      <Sidebar active="position" />

      <PageWrapper isOpen={isOpenSidebar}>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Position" />
              <AddPosition />
            </Row>
          </div>
          <Position />
        </Container>
      </PageWrapper>

      <ToastContainer />
    </MainWrapper>
  );
};

export default PositionPage;
