import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  ProfileSelector,
  fetchProfile,
} from "../../../features/staff/staffSlice";

import { PersonalInfo } from "./profile";
const Profile = (prop) => {
  const dispatch = useDispatch();

  const profile = useSelector(ProfileSelector);

  useEffect(() => {
    dispatch(fetchProfile(prop.idProfile));
  }, []);

  if (profile != null) {
    return (
      <Card>
        <Card.Body>
          <Card.Title> Information Basic</Card.Title>
          <PersonalInfo>
            <Row className="mb-3">
              <Col md={3}>Full Name</Col>
              <Col md={9}>{profile.fullname}</Col>
            </Row>
            <Row className="mb-3">
              <Col md={3}>English Name</Col>
              <Col md={9}>{profile.fullname}</Col>
            </Row>
            <Row className="mb-3">
              <Col md={3}>Date of birth</Col>
              <Col md={9}>{profile.date_of_birth}</Col>
            </Row>
            <Row className="mb-3">
              <Col md={3}>Position</Col>
              <Col md={9}>{profile.position.name}</Col>
            </Row>
            <Row className="mb-3">
              <Col md={3}>Department</Col>
              <Col md={9}>{profile.department.name}</Col>
            </Row>
            <Row className="mb-3">
              <Col md={3}>Job Title</Col>
              <Col md={9}>{profile.job_title.title}</Col>
            </Row>
            <Row className="mb-3">
              <Col md={3}>Manager</Col>
              <Col md={9}>
                {profile.upper_level ? profile.upper_level.fullname : ""}
              </Col>
            </Row>
          </PersonalInfo>
          <Card.Title> Contact</Card.Title>
          <PersonalInfo>
            <Row className="mb-3">
              <Col md={3}>Email</Col>
              <Col md={9}>{profile.email}</Col>
            </Row>

            <Row className="mb-3">
              <Col md={3}>Company Email</Col>
              <Col md={9}>{profile.email}</Col>
            </Row>
            <Row className="mb-3">
              <Col md={3}>Phone</Col>
              <Col md={9}>{profile.phone}</Col>
            </Row>
            <Row className="mb-3">
              <Col md={3}>Address</Col>
              <Col md={9}>85/23c kdc dai hai</Col>
            </Row>
          </PersonalInfo>
        </Card.Body>
      </Card>
    );
  }
};

export default Profile;
