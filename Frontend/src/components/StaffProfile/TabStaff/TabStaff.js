import React from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { TabBox } from "../../../pages/ProfilePage/profilePage";
import Onboarding from "../Onboarding/Onboarding";
import Profile from "../Profile/Profile";
import TopProfile from "../TopProfile/TopProfile";

const TabStaff = () => {
  return (
    <TabBox className="card">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Tabs defaultActiveKey="profile" className="mb-3">
            <Tab eventKey="profile" title="Profile">
              <Profile />
            </Tab>
            <Tab eventKey="time_off" title="TIME OFF">
              hohoho
            </Tab>
            <Tab eventKey="onboarding" title="ONBOARDING">
              <Onboarding />
            </Tab>
            <Tab eventKey="performance_form" title="PERFORMANCE FROM">
              hihihi
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </TabBox>
  );
};

export default TabStaff;
