import React from "react";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";
import PageHeader from "../../components/PageHeader/PageHeader";
import { Container, Row } from "react-bootstrap";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import InactiveStaff from "../../components/Staff/InactiveStaff";
import { isOpenSelector } from "../../features/sidebar/sidebarSlice";
import { useSelector } from "react-redux";

const InactiveStaffPage = () => {
  const isOpenSidebar = useSelector(isOpenSelector);

  return (
    <MainWrapper>
      <Header />
      <Sidebar active="inactive_staff" />

      <PageWrapper isOpen={isOpenSidebar}>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Job Title" />
            </Row>
          </div>
          <InactiveStaff />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default InactiveStaffPage;
