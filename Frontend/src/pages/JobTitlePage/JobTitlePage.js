import React from "react";
import { Container, Row } from "react-bootstrap";
import AddJobTitle from "../../components/JobTitle/AddJobTitle";
import PageHeader from "../../components/PageHeader/PageHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import Header from "../../components/Header/Header";
import JobTitle from "../../components/JobTitle/JobTitle";
import { isOpenSelector } from "../../features/sidebar/sidebarSlice";
import { useSelector } from "react-redux";

const JobTitlePage = () => {
  const isOpenSidebar = useSelector(isOpenSelector);

  return (
    <MainWrapper>
      <Header />
      <Sidebar active="job_title" />

      <PageWrapper isOpen={isOpenSidebar}>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Job Title" />
              <AddJobTitle />
            </Row>
          </div>
          <JobTitle />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default JobTitlePage;
