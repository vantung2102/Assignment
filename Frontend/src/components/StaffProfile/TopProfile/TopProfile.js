import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../../assets/images/home/user.jpg";
import "./toggleSwitch.scss";

import {
  getRoleSelector,
  getUserSelector,
} from "../../../features/auth/authSlice";
import {
  profileSelector,
  fetchProfile,
} from "../../../features/staff/staffSlice";
import { ProfileView, ButtonToggleSwitch } from "./topProfile";
import topProfile from "./topProfile.module.scss";

const TopProfile = ({ idProfile }) => {
  const dispatch = useDispatch();
  const role = useSelector(getRoleSelector);
  const profile = useSelector(!role ? getUserSelector : profileSelector);
  const [name, setName] = useState("");
  const [active, setActive] = useState(null);

  useEffect(() => {
    dispatch(fetchProfile(idProfile));
  }, [dispatch, idProfile]);

  useEffect(() => {
    if (!profile) return;

    const { status, fullname } = profile?.attributes;
    setName(fullname);
    setActive(status);
  }, [profile]);

  const handleChangeActivation = (status) => {
    if (status === active) {
    }
  };

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
                          <h3 className="mb-0">{name}</h3>

                          <div className="staff-id">
                            Employee ID : {profile?.id}
                          </div>

                          <div className="mt-3">
                            <ButtonToggleSwitch htmlFor="toggle">
                              <input
                                id="toggle"
                                type="checkbox"
                                // checked={checked}
                                onChange={handleChangeActivation}
                              />
                              <span className="slider"></span>
                            </ButtonToggleSwitch>
                          </div>
                        </div>
                      </div>
                    </div>
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
