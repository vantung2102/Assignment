import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { RxPencil2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

import avatar from "../../assets/images/home/user.jpg";
import {
  ProfileSelector,
  fetchProfileAsync,
} from "../../features/staff/staffSlice";
import { ProfileView } from "../../pages/StaffProfile/staffProfile";

import staffProfile from "./staffProfile.module.scss";

const Profile = (prop) => {
  const profile = useSelector(ProfileSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileAsync(prop.idProfile));
  }, []);

  if (profile != null) {
    return (
      <Card className="mb-0" key="profile.id">
        <div className="card-body">
          <Row>
            <Col md={12}>
              <ProfileView>
                <div className={staffProfile.ProfileImgWrap}>
                  <img
                    className={staffProfile.ProfileImg}
                    src={avatar}
                    alt=""
                  />
                </div>
                <div className="profile-basic">
                  <Row className="row">
                    <Col md={5}>
                      <div className={staffProfile.ProfileInfoLeft}>
                        <div className="d-flex align-items-center">
                          <div style={{ flex: 1 }}>
                            <h3 className="user-name m-t-0 mb-0">
                              {profile.fullname}
                            </h3>
                            <h6 className="text-muted">
                              {/* {profile.department.id && profile.department.id} */}
                            </h6>
                          </div>

                          <div style={{ flex: 1 }}>
                            <a className="btn btn-active" href="">
                              Active
                            </a>
                          </div>
                        </div>
                        <small className="text-muted">
                          {/* {profile.job_title.title && profile.job_title.title} */}
                          {/* {profile.position.name && profile.position.name} */}
                        </small>
                        <div className="staff-id">Employee ID : FT-0001</div>
                        <div className="small doj text-muted mt-1">
                          Date of Join : {profile.created_at}
                        </div>
                      </div>
                    </Col>
                    <Col md={7}>
                      <ul className="personal-info">
                        <li>
                          <div className="title">Phone:</div>
                          <div className="text">
                            <a href="">{profile.phone}</a>
                          </div>
                        </li>
                        <li>
                          <div className="title">Email:</div>
                          <div className="text">
                            <a href="">{profile.email}</a>
                          </div>
                        </li>
                        <li>
                          <div className="title">Birthday:</div>
                          <div className="text">{profile.date_of_birth}</div>
                        </li>
                        <li>
                          <div className="title">Address:</div>
                          <div className="text">
                            1861 Bayonne Ave, Manchester Township, NJ, 08759
                          </div>
                        </li>
                        <li>
                          <div className="title">Gender:</div>
                          <div className="text">Male</div>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </div>
                <div className="profile-edit">
                  <a className="edit-icon" href="#">
                    <RxPencil2 />
                  </a>
                </div>
              </ProfileView>
            </Col>
          </Row>
        </div>
      </Card>
    );
  }
};

export default Profile;
