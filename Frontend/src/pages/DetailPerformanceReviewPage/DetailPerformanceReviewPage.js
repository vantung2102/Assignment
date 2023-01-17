import React from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader/PageHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import DetailReviewPerformance from "../../components/Performance/DetailReviewPerformance";
import { useSelector } from "react-redux";
import { isOpenSelector } from "../../features/sidebar/sidebarSlice";
import { getRoleSelector } from "../../features/auth/authSlice";

const DetailPerformanceReviewPage = () => {
  const { id } = useParams();
  const isOpenSidebar = useSelector(isOpenSelector);
  const role = useSelector(getRoleSelector);
  return (
    <MainWrapper>
      <Header />
      <Sidebar active={role == "Manager" ? "performance" : "review"} />

      <PageWrapper isOpen={isOpenSidebar}>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Review for Staff" />
            </Row>
          </div>
          <DetailReviewPerformance idRequest={id} />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default DetailPerformanceReviewPage;
