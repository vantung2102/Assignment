import React, { useEffect, useState } from "react";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { HeaderContainer, UserMenu, UserImg } from "./header";
import "./header.scss";
import logo from "../../assets/images/logo/logo1.png";
import avatar from "../../assets/images/home/user.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  getUserSelector,
  getRoleSelector,
} from "../../features/auth/authSlice";
import {
  isOpenSelector,
  openSidebar,
} from "../../features/sidebar/sidebarSlice";

const Header = () => {
  const dispatch = useDispatch();
  const profile = useSelector(getUserSelector);
  const isOpenSidebar = useSelector(isOpenSelector);
  const role = useSelector(getRoleSelector);

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

  const handleShowSetting = (e) => {
    e.stopPropagation();
    setIsOpenSetting(!isOpenSetting);
  };

  const handleSidebar = () => {
    dispatch(openSidebar(!isOpenSidebar));
  };

  return (
    <HeaderContainer isOpen={isOpenSidebar}>
      <div className="header-left">
        <Link className="logo">
          <img src={logo} width="40" height="40" alt="" />
        </Link>
      </div>

      <Link className="toggle_btn">
        <HiBars3CenterLeft onClick={handleSidebar} />
      </Link>

      <div className="page-title-box">
        <h3>Zane Office</h3>
      </div>

      <UserMenu className="nav">
        <li
          className="nav-item dropdown has-arrow main-drop"
          onClick={handleShowSetting}
        >
          <Link className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
            <UserImg className="me-1">
              <img src={avatar} alt="" />
              <span className="status online"></span>
            </UserImg>
            <span>{role ? "Admin" : profile?.attributes.fullname}</span>
          </Link>
          <div
            className={isOpenSetting ? `show dropdown-menu` : "dropdown-menu"}
            style={{ position: "absolute", right: "20px" }}
          >
            <Link
              to={`/staff_management/staff/${profile?.id}`}
              className="dropdown-item"
            >
              My Profile
            </Link>
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
