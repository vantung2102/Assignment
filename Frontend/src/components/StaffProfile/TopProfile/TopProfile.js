import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../../assets/images/home/user.jpg";
import ToggleSwitch from "../../../common/helpers/ToggleSwitch/ToggleSwitch";
import {
  profileSelector,
  fetchProfile,
} from "../../../features/staff/staffSlice";
import { ProfileView } from "./topProfile";
import topProfile from "./topProfile.module.scss";

const TopProfile = ({ idProfile }) => {
  const dispatch = useDispatch();

  const profile = useSelector(profileSelector);

  useEffect(() => {
    dispatch(fetchProfile(idProfile));
  }, [dispatch, idProfile]);

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
                          <h3 className="mb-0">
                            {profile?.attributes.fullname}
                          </h3>

                          <div className="staff-id">
                            Employee ID : {profile?.id}
                          </div>

                          <div className="mt-3">
                            <ToggleSwitch profile={profile} id={profile?.id} />
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
