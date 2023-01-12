import React from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import AddDepartment from "../../components/Department/AddDepartment";
import Department from "../../components/Department/Department";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader/PageHeader";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import { isOpenSelector } from "../../features/sidebar/sidebarSlice";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";

const DepartmentPage = () => {
  const isOpenSidebar = useSelector(isOpenSelector);

  return (
    <MainWrapper>
      <Header />
      <Sidebar active="department" />

      <PageWrapper isOpen={isOpenSidebar}>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Department" />
              <AddDepartment />
            </Row>
          </div>
          <Department />
        </Container>
      </PageWrapper>

      <ToastContainer />
    </MainWrapper>
  );
};

export default DepartmentPage;
