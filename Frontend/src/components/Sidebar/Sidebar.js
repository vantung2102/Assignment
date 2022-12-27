import React from "react";
// =========== Style =========
import styles from "./sidebar.module.scss";
import { SidebarContainer, SidebarInner, SidebarMenu } from "./sidebar";
// =========== Icon =========

import {
  AiOutlineFileProtect,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { GiStairsGoal } from "react-icons/gi";
import {
  FaLayerGroup,
  FaWpforms,
  FaHistory,
  FaMoneyBillAlt,
} from "react-icons/fa";
import { BsFiles } from "react-icons/bs";
import { FcSalesPerformance } from "react-icons/fc";
import { GrPersonalComputer, GrTask } from "react-icons/gr";
import {
  MdOutlineHomeRepairService,
  MdOutlineTitle,
  MdContacts,
  MdOutlineAccountCircle,
  MdReportGmailerrorred,
} from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { RiNodeTree } from "react-icons/ri";

const Sidebar = (prop) => {
  const active = {
    color: "#00c5fb",
  };

  return (
    <SidebarContainer style={{ overflowY: "auto" }}>
      <div>
        <div>
          <SidebarInner>
            <SidebarMenu>
              <ul>
                <li className={styles.menuTitle}>
                  <span> Staff Management</span>
                </li>

                <li className="submenu">
                  <NavLink to="/" style={prop.active == "home" ? active : null}>
                    <RiNodeTree className={styles.iconSidebar} />
                    <span> Staff Chart</span>
                  </NavLink>
                </li>

                <li className="submenu">
                  <NavLink
                    to="/staff_management/departments"
                    style={prop.active == "department" ? active : null}
                  >
                    <MdOutlineHomeRepairService
                      className={styles.iconSidebar}
                    />
                    <span> Departments</span>
                  </NavLink>
                </li>

                <li className="submenu">
                  <NavLink
                    to="/staff_management/job_titles"
                    style={prop.active == "job_title" ? active : null}
                  >
                    <MdOutlineTitle className={styles.iconSidebar} />
                    <span> Job Title</span>
                  </NavLink>
                </li>

                <li className="submenu">
                  <NavLink
                    to="/staff_management/positions"
                    style={prop.active == "position" ? active : null}
                  >
                    <GiStairsGoal className={styles.iconSidebar} />
                    <span> Positions</span>
                  </NavLink>
                </li>

                <li className="submenu">
                  <NavLink>
                    <MdContacts className={styles.iconSidebar} />
                    <span> Contracts</span>
                  </NavLink>
                </li>

                <li className="submenu">
                  <NavLink
                    to="/staff_management/staff"
                    style={prop.active == "staff" ? active : null}
                  >
                    <AiOutlineUser className={styles.iconSidebar} />
                    <span> Staff</span>
                  </NavLink>
                </li>

                <li className={styles.menuTitle}>
                  <span> Leave Management</span>
                </li>

                <li className="submenu">
                  <NavLink>
                    <MdContacts className={styles.iconSidebar} />
                    <span> Leave</span>
                  </NavLink>
                </li>

                <li className="submenu">
                  <NavLink>
                    <FaWpforms className={styles.iconSidebar} />
                    <span> Leave Applications</span>
                  </NavLink>
                </li>

                <li className={styles.menuTitle}>
                  <span> Onboarding Management</span>
                </li>

                <li className="submenu">
                  <NavLink>
                    <BsFiles className={styles.iconSidebar} />
                    <span> Onboarding sample</span>
                  </NavLink>
                </li>

                <li className="submenu">
                  <NavLink>
                    <AiOutlineUsergroupAdd className={styles.iconSidebar} />
                    <span> Staff onboarding</span>
                  </NavLink>
                </li>

                <li className={styles.menuTitle}>
                  <span> Performance Management</span>
                </li>

                <li className="submenu">
                  <NavLink>
                    <FcSalesPerformance className={styles.iconSidebar} />
                    <span> Forms</span>
                  </NavLink>
                </li>

                <li className={styles.menuTitle}>
                  <span> Request Management</span>
                </li>

                <li className="submenu">
                  <NavLink
                    to="/request_management/request_properties"
                    style={prop.active == "request_properties" ? active : null}
                  >
                    <AiOutlineUser className={styles.iconSidebar} />
                    <span> Request Properties</span>
                  </NavLink>
                </li>

                <li className={styles.menuTitle}>
                  <span> Property Management</span>
                </li>

                <li className="submenu">
                  <NavLink
                    to="/property_management/properties_group"
                    style={prop.active == "properties_group" ? active : null}
                  >
                    <FaLayerGroup className={styles.iconSidebar} />
                    <span> Group Properties</span>
                  </NavLink>
                </li>

                <li className="submenu">
                  <NavLink
                    to="/property_management/properties"
                    style={prop.active == "properties" ? active : null}
                  >
                    <GrPersonalComputer className={styles.iconSidebar} />
                    <span> Properties</span>
                  </NavLink>
                </li>

                <li className="submenu">
                  <NavLink
                    to="/property_management/property_providing_histories"
                    style={
                      prop.active == "property_providing_histories"
                        ? active
                        : null
                    }
                  >
                    <FaHistory className={styles.iconSidebar} />
                    <span> Providing Histories</span>
                  </NavLink>
                </li>

                <li className={styles.menuTitle}>
                  <span> Hr Management</span>
                </li>

                <li className="submenu">
                  <NavLink>
                    <MdOutlineAccountCircle className={styles.iconSidebar} />
                    <span> Accounting</span>
                  </NavLink>
                </li>

                <li className="submenu">
                  <NavLink>
                    <FaMoneyBillAlt className={styles.iconSidebar} />
                    <span> Payroll</span>
                  </NavLink>
                </li>

                <li className="submenu">
                  <NavLink>
                    <AiOutlineFileProtect className={styles.iconSidebar} />
                    <span> Policy</span>
                  </NavLink>
                </li>

                <li className="submenu">
                  <NavLink>
                    <MdReportGmailerrorred className={styles.iconSidebar} />
                    <span> Report</span>
                  </NavLink>
                </li>

                <li className={styles.menuTitle}>
                  <span> Project Management</span>
                </li>

                <li className="submenu">
                  <NavLink>
                    <GrTask className={styles.iconSidebar} />
                    <span> Tasks</span>
                  </NavLink>
                </li>

                <li className="submenu">
                  <NavLink>
                    <AiOutlineFundProjectionScreen
                      className={styles.iconSidebar}
                    />
                    <span> Projection</span>
                  </NavLink>
                </li>
              </ul>
            </SidebarMenu>
          </SidebarInner>
        </div>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
