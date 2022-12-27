import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import TopProfile from "../../components/StaffProfile/TopProfile/TopProfile";

import { PageWrapper } from "../../global/jsx/common";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { TabBox } from "./profilePage";
import Profile from "../../components/StaffProfile/Profile/Profile";

const StaffProfile = () => {
  const { id } = useParams();
  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />

      <PageWrapper>
        <Container fluid className="content">
          <TopProfile idProfile={id} />

          <TabBox className="card">
            <Row>
              <Col lg={12} md={12} sm={12}>
                <ul className="nav nav-tabs nav-tabs-bottom">
                  <li className="nav-item">
                    <Link data-bs-toggle="tab" className="nav-link active">
                      HR PROFILE
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link data-bs-toggle="tab" className="nav-link">
                      TIME OFF
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link data-bs-toggle="tab" className="nav-link">
                      ONBOARDING
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link data-bs-toggle="tab" className="nav-link">
                      PROJECT
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link data-bs-toggle="tab" className="nav-link">
                      PERFORMANCE FROM
                    </Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </TabBox>

          <Profile />
        </Container>
      </PageWrapper>
    </div>
  );
};

export default StaffProfile;
