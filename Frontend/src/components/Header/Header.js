import React, { useEffect, useState } from "react";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { AiOutlineSearch, AiOutlineBell } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

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

const Header = () => {
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [isOpenMessage, setIsOpenMessage] = useState(null);

  useEffect(() => {
    window.addEventListener("click", () => {
      setIsOpenNotification(false);
    });
  });

  const handleShowNotification = (e) => {
    e.stopPropagation();
    setIsOpenMessage(false);
    setIsOpenNotification(!isOpenNotification);
  };

  const handleShowMessage = (e) => {
    e.stopPropagation();
    setIsOpenNotification(false);
    setIsOpenMessage(!isOpenNotification);
  };

  return (
    <HeaderContainer>
      <div className="header-left">
        <a className="logo" href="">
          <img src={logo} width="40" height="40" alt="" />
        </a>
      </div>

      <a className="toggle_btn" href="#">
        <HiBars3CenterLeft />
      </a>

      <div className="page-title-box">
        <h3>Dreamguy's Technologies</h3>
      </div>

      <UserMenu className="nav">
        <li className="nav-item">
          <div className="top-nav-search">
            <form>
              <input
                className="form-control"
                type="text"
                placeholder="Search here"
              />
              <button className="btn" type="submit">
                <AiOutlineSearch />
              </button>
            </form>
          </div>
        </li>

        <li className="nav-item dropdown" onClick={handleShowNotification}>
          <a
            href="#"
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
          >
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
                <a href="" className="clear-notification">
                  Clear All
                </a>
              </TopNavDropdownHeader>

              <NotificationContent>
                <ul className="notification-list">
                  <li className="notification-message">
                    <a href="">
                      <Media className="media">
                        <span className="avatar">
                          <img
                            src={avatar}
                            style={{ width: "40px", height: "40px" }}
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
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="">
                      <Media className="media">
                        <span className="avatar">
                          <img
                            src={avatar}
                            style={{ width: "40px", height: "40px" }}
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
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="">
                      <Media className="media">
                        <span className="avatar">
                          <img
                            src={avatar}
                            style={{ width: "40px", height: "40px" }}
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
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="">
                      <Media className="media">
                        <span className="avatar">
                          <img
                            src={avatar}
                            style={{ width: "40px", height: "40px" }}
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
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="">
                      <Media className="media">
                        <span className="avatar">
                          <img
                            src={avatar}
                            style={{ width: "40px", height: "40px" }}
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
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="">
                      <Media className="media">
                        <span className="avatar">
                          <img
                            src={avatar}
                            style={{ width: "40px", height: "40px" }}
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
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="">
                      <Media className="media">
                        <span className="avatar">
                          <img
                            src={avatar}
                            style={{ width: "40px", height: "40px" }}
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
                    </a>
                  </li>
                </ul>
              </NotificationContent>

              <TopNavDropdownFooter className="top-nav-dropdown-footer">
                <a href="">View all Notifications</a>
              </TopNavDropdownFooter>
            </div>
          </a>
        </li>

        <li className="nav-item dropdown" onClick={handleShowMessage}>
          <a
            href="#"
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
          >
            <FaRegComment style={{ fontSize: "22px" }} />
            <span className="badge badge-pill">3</span>

            <div
              className={
                isOpenMessage
                  ? `show dropdown-menu notifications open`
                  : "dropdown-menu notifications"
              }
            >
              <TopNavDropdownHeader className="top-nav-dropdown-header">
                <span className="notification-title">Message</span>
                <a href="" className="clear-notification">
                  Clear All
                </a>
              </TopNavDropdownHeader>

              <NotificationContent>
                <ul className="notification-list">
                  <li className="notification-message">
                    <a href="">
                      <Media className="media">
                        <span className="avatar">
                          <img
                            src={avatar}
                            style={{ width: "40px", height: "40px" }}
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
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="">
                      <Media className="media">
                        <span className="avatar">
                          <img
                            src={avatar}
                            style={{ width: "40px", height: "40px" }}
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
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="">
                      <Media className="media">
                        <span className="avatar">
                          <img
                            src={avatar}
                            style={{ width: "40px", height: "40px" }}
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
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="">
                      <Media className="media">
                        <span className="avatar">
                          <img
                            src={avatar}
                            style={{ width: "40px", height: "40px" }}
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
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="">
                      <Media className="media">
                        <span className="avatar">
                          <img
                            src={avatar}
                            style={{ width: "40px", height: "40px" }}
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
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="">
                      <Media className="media">
                        <span className="avatar">
                          <img
                            src={avatar}
                            style={{ width: "40px", height: "40px" }}
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
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="">
                      <Media className="media">
                        <span className="avatar">
                          <img
                            src={avatar}
                            style={{ width: "40px", height: "40px" }}
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
                    </a>
                  </li>
                </ul>
              </NotificationContent>

              <TopNavDropdownFooter className="top-nav-dropdown-footer">
                <a href="">View all Notifications</a>
              </TopNavDropdownFooter>
            </div>
          </a>
        </li>

        <li className="nav-item dropdown has-arrow main-drop">
          <a
            href="#"
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
          >
            <UserImg className="me-1">
              <img src={avatar} alt="" />
              <span className="status online"></span>
            </UserImg>
            <span>Admin</span>
            <IoIosArrowDown className="ms-1" />
          </a>
          <div className="dropdown-menu">
            <a
              className="dropdown-item"
              href="/blue/app/profile/employee-profile"
            >
              My Profile
            </a>
            <a className="dropdown-item" href="/blue/settings/companysetting">
              Settings
            </a>
            <a className="dropdown-item" href="/blue/login">
              Logout
            </a>
          </div>
        </li>
      </UserMenu>
    </HeaderContainer>
  );
};

export default Header;
