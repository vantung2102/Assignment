import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
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
  destroyStaff,
  lowerLevelStaff,
  inActiveStaff,
} from "../../../features/staff/staffSlice";
import { ProfileView } from "./topProfile";
import topProfile from "./topProfile.module.scss";
import FormInactive from "./FormInactive";
import { useNavigate } from "react-router-dom";

const TopProfile = ({ idProfile }) => {
  const dispatch = useDispatch();
  const role = useSelector(getRoleSelector);
  const profile = useSelector(!role ? getUserSelector : profileSelector);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const inActive = useSelector(inActiveStaff);

  useEffect(() => {
    dispatch(fetchProfile(idProfile));
  }, [dispatch, idProfile]);

  useEffect(() => {
    if (!profile) return;
    const { fullname } = profile?.attributes;
    setName(fullname);
  }, [profile]);

  const handleClose = () => setShow(false);

  const handleInactive = () => {
    setShow(true);
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
                          <Button
                            size="sm"
                            className="mt-3"
                            variant={inActive ? "success" : "danger"}
                            onClick={handleInactive}
                          >
                            {inActive ? "Active" : "Inactive"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </ProfileView>
          </Col>
        </Row>
        <FormInactive show={show} close={handleClose} idProfile={idProfile} />
      </Card.Body>
    </Card>
  );
};

export default TopProfile;
