import React from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader/PageHeader";
import AddPosition from "../../components/Position/AddPosition";
import { isOpenSelector } from "../../features/sidebar/sidebarSlice";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";

const StaffChartPage = () => {
  const isOpenSidebar = useSelector(isOpenSelector);

  return (
    <MainWrapper>
      <Header />
      <Sidebar active="staffChart" />

      <PageWrapper isOpen={isOpenSidebar}>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="home" />
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

export default StaffChartPage;
