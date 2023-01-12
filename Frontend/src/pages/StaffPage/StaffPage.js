import React from "react";
import Container from "react-bootstrap/Container";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Staff from "../../components/Staff/Staff";
import PageHeader from "../../components/PageHeader/PageHeader";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";
import AddStaff from "../../components/Staff/AddStaff";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import { Row } from "react-bootstrap";
import { isOpenSelector } from "../../features/sidebar/sidebarSlice";
import { useSelector } from "react-redux";

const StaffPage = () => {
  const isOpenSidebar = useSelector(isOpenSelector);

  return (
    <MainWrapper>
      <Header />
      <Sidebar active="staff" />
      <PageWrapper isOpen={isOpenSidebar}>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Employee" />
              <AddStaff />
            </Row>
          </div>
          <Staff />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default StaffPage;
