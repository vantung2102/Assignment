import React from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRoleSelector } from "../../../features/auth/authSlice";
import { TabBox } from "../../../pages/ProfilePage/profilePage";
import DetailLeave from "../../Leave/DetailLeave";
import Onboarding from "../Onboarding/Onboarding";
import Profile from "../Profile/Profile";

const TabStaff = () => {
  const role = useSelector(getRoleSelector);
  const { id } = useParams();

  return (
    <TabBox className="card">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Tabs defaultActiveKey="profile" className="mb-3">
            <Tab eventKey="profile" title="Profile">
              <Profile />
            </Tab>
            <Tab eventKey="time_off" title="TIME OFF">
              <DetailLeave idRequest={id} isUser={true} />
            </Tab>
            {role && (
              <Tab eventKey="onboarding" title="ONBOARDING">
                <Onboarding />
              </Tab>
            )}
          </Tabs>
        </Col>
      </Row>
    </TabBox>
  );
};

export default TabStaff;
