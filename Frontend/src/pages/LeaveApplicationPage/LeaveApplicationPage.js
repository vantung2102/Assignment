import React from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";
import AddLeaveApplication from "../../components/LeaveApplication/AddLeaveApplication";
import LeaveApplication from "../../components/LeaveApplication/LeaveApplication";
import PageHeader from "../../components/PageHeader/PageHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";
import { useSelector } from "react-redux";
import { isOpenSelector } from "../../features/sidebar/sidebarSlice";

const LeaveApplicationPage = () => {
  const isOpenSidebar = useSelector(isOpenSelector);

  return (
    <MainWrapper>
      <Header />
      <Sidebar active="leave_application" />

      <PageWrapper isOpen={isOpenSidebar}>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Leave Application" />
              <AddLeaveApplication />
            </Row>
          </div>
          <LeaveApplication />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default LeaveApplicationPage;
