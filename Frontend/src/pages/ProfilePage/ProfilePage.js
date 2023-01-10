import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import TopProfile from "../../components/StaffProfile/TopProfile/TopProfile";
import { PageWrapper } from "../../global/jsx/common";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TabStaff from "../../components/StaffProfile/TabStaff/TabStaff";

const StaffProfile = () => {
  const { id } = useParams();
  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar active="staff" />

      <PageWrapper>
        <Container fluid className="content">
          <TopProfile idProfile={id} />

          <TabStaff />
        </Container>
      </PageWrapper>
    </div>
  );
};

export default StaffProfile;
