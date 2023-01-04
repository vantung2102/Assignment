import React, { useEffect } from "react";
import { Card, Col, Dropdown, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import avatar from "../../../assets/images/home/user.jpg";
import {
  ProfileSelector,
  fetchProfile,
} from "../../../features/staff/staffSlice";
import { ProfileView } from "./topProfile";

import topProfile from "./topProfile.module.scss";

const TopProfile = (prop) => {
  const profile = useSelector(ProfileSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile(prop.idProfile));
  }, []);

  return (
    <Card className="mb-0">
      <Card.Body>
        <Row>
          <Col md={12}>
            <ProfileView>
              <div className={topProfile.ProfileImgWrap}>
                <img className={topProfile.ProfileImg} src={avatar} alt="" />
              </div>
              <div className="profile-basic">
                <Row>
                  <Col md={5}>
                    <div className={topProfile.ProfileInfoLeft}>
                      <div className="d-flex align-items-center">
                        <div style={{ flex: 1 }}>
                          <h3 className="user-name m-t-0 mb-0">
                            {profile?.attributes.fullname}
                          </h3>
                          <div className="staff-id">Employee ID : FT-0001</div>

                          <h6 className="text-muted">
                            {profile?.attributes?.department?.name}
                            {","}
                            {profile?.attributes?.position?.name}
                            {","}
                            {profile?.attributes?.job_title?.title}
                          </h6>
                        </div>

                        <div className="justify-content-end">
                          <Link className="btn btn-active">Active</Link>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={7}>
                    <ul className="personal-info d-flex justify-content-end">
                      <li>
                        <Dropdown>
                          <Dropdown.Toggle id={topProfile.DropdownBasic}>
                            Job Change
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item>Action</Dropdown.Item>
                            <Dropdown.Item>Another action</Dropdown.Item>
                            <Dropdown.Item>Something else</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                      <li>
                        <Dropdown>
                          <Dropdown.Toggle id={topProfile.DropdownBasic}>
                            Probation
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item>Action</Dropdown.Item>
                            <Dropdown.Item>Another action</Dropdown.Item>
                            <Dropdown.Item>Something else</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                      <li>
                        <Dropdown>
                          <Dropdown.Toggle id={topProfile.DropdownBasic}>
                            More
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item>Action</Dropdown.Item>
                            <Dropdown.Item>Another action</Dropdown.Item>
                            <Dropdown.Item>Something else</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </div>
            </ProfileView>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TopProfile;
