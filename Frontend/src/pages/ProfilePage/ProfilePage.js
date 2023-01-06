import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import TopProfile from "../../components/StaffProfile/TopProfile/TopProfile";

import { PageWrapper } from "../../global/jsx/common";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { TabBox } from "./profilePage";
import Profile from "../../components/StaffProfile/Profile/Profile";
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
