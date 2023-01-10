import React, { useEffect, useState } from "react";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { AiOutlineBell } from "react-icons/ai";
import {
  HeaderContainer,
  UserMenu,
  UserImg,
  TopNavDropdownHeader,
  TopNavDropdownFooter,
  Media,
  NotificationContent,
} from "./header";
import "./header.scss";
import logo from "../../assets/images/logo/logo1.png";
import avatar from "../../assets/images/home/user.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();

  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [isOpenSetting, setIsOpenSetting] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    window.addEventListener("click", () => {
      setIsOpenNotification(false);
      setIsOpenSetting(false);
    });
  });

  const handleShowNotification = (e) => {
    e.stopPropagation();
    setIsOpenNotification(!isOpenNotification);
  };

  const handleShowSetting = (e) => {
    e.stopPropagation();
    setIsOpenSetting(!isOpenSetting);
  };

  return (
    <HeaderContainer>
      <div className="header-left">
        <Link className="logo">
          <img src={logo} width="40" height="40" alt="" />
        </Link>
      </div>

      <Link className="toggle_btn">
        <HiBars3CenterLeft />
      </Link>

      <div className="page-title-box">
        <h3>Zane Office</h3>
      </div>

      <UserMenu className="nav">
        <li className="nav-item dropdown" onClick={handleShowNotification}>
          <div className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
            <AiOutlineBell style={{ fontSize: "25px" }} />
            <span className="badge badge-pill">3</span>

            <div
              className={
                isOpenNotification
                  ? `show dropdown-menu notifications open`
                  : "dropdown-menu notifications"
              }
              onClick={(e) => e.stopPropagation()}
            >
              <TopNavDropdownHeader className="top-nav-dropdown-header">
                <span className="notification-title">Notifications</span>
                <Link className="clear-notification">Clear All</Link>
              </TopNavDropdownHeader>

              <NotificationContent>
                <ul className="notification-list">
                  <li className="notification-message">
                    <Link>
                      <Media className="media">
                        <span className="avatar">
                          <img
                            src={avatar}
                            style={{ width: "40px", height: "40px" }}
                            alt=""
                          />
                        </span>
                        <div className="media-body">
                          <p className="notification-details">
                            <span className="notification-title">John Doe</span>{" "}
                            added new task
                            <span className="notification-title">
                              Patient appointment booking
                            </span>
                          </p>
                          <p className="notification-time">
                            <span>4 mins ago</span>
                          </p>
                        </div>
                      </Media>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link>
                      <Media className="media">
                        <span className="avatar">
                          <img
                            src={avatar}
                            style={{ width: "40px", height: "40px" }}
                            alt=""
                          />
                        </span>
                        <div className="media-body">
                          <p className="notification-details">
                            <span className="notification-title">John Doe</span>{" "}
                            added new task
                            <span className="notification-title">
                              Patient appointment booking
                            </span>
                          </p>
                          <p className="notification-time">
                            <span>4 mins ago</span>
                          </p>
                        </div>
                      </Media>
                    </Link>
                  </li>
                </ul>
              </NotificationContent>

              <TopNavDropdownFooter className="top-nav-dropdown-footer">
                <Link>View all Notifications</Link>
              </TopNavDropdownFooter>
            </div>
          </div>
        </li>

        <li
          className="nav-item dropdown has-arrow main-drop"
          onClick={handleShowSetting}
        >
          <Link className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
            <UserImg className="me-1">
              <img src={avatar} alt="" />
              <span className="status online"></span>
            </UserImg>
            <span>Admin</span>
          </Link>
          <div
            className={isOpenSetting ? `show dropdown-menu` : "dropdown-menu"}
            style={{ position: "absolute", right: "20px" }}
          >
            <Link className="dropdown-item">My Profile</Link>
            <Link className="dropdown-item">Settings</Link>
            <Link className="dropdown-item" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        </li>
      </UserMenu>
    </HeaderContainer>
  );
};

export default Header;
