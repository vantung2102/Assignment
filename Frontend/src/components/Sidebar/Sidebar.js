import React from "react";
// =========== Style =========
import styles from "./sidebar.module.scss";
import { SidebarContainer, SidebarInner, SidebarMenu } from "./sidebar";
// =========== Icon =========

import { AiOutlineUser } from "react-icons/ai";
import { GiStairsGoal } from "react-icons/gi";
import { FaLayerGroup, FaWpforms, FaHistory } from "react-icons/fa";
import { BsFiles } from "react-icons/bs";
import { GrDocumentPerformance, GrPersonalComputer } from "react-icons/gr";
import {
  MdOutlineHomeRepairService,
  MdOutlineTitle,
  MdContacts,
  MdOutlineRateReview,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import { RiNodeTree } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import SideBarTitle from "./SideBarTitle";
import { useSelector } from "react-redux";
import { getRoleSelector } from "../../features/auth/authSlice";

const Sidebar = ({ active }) => {
  const role = useSelector(getRoleSelector);

  const styleActive = {
    color: "#00c5fb",
  };
  const setActive = (active, attr) => (active === attr ? styleActive : null);

  return (
    <SidebarContainer style={{ overflowY: "auto" }}>
      <div>
        <div>
          <SidebarInner>
            <SidebarMenu>
              <ul>
                <SideBarTitle title="Staff Management" />

                <li>
                  <NavLink to="/" style={setActive(active, "home")}>
                    <RiNodeTree className={styles.iconSidebar} />
                    <span>Staff Chart</span>
                  </NavLink>
                </li>

                {/* department ====== position ========job title */}
                {role && (
                  <>
                    <li>
                      <NavLink
                        to="/staff_management/departments"
                        style={setActive(active, "department")}
                      >
                        <MdOutlineHomeRepairService
                          className={styles.iconSidebar}
                        />
                        <span>Departments</span>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/staff_management/job_titles"
                        style={setActive(active, "job_title")}
                      >
                        <MdOutlineTitle className={styles.iconSidebar} />
                        <span>Job Title</span>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/staff_management/positions"
                        style={setActive(active, "position")}
                      >
                        <GiStairsGoal className={styles.iconSidebar} />
                        <span>Positions</span>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/staff_management/staff"
                        style={setActive(active, "staff")}
                      >
                        <AiOutlineUser className={styles.iconSidebar} />
                        <span> Staff</span>
                      </NavLink>
                    </li>
                  </>
                )}

                <SideBarTitle title="Leave Management" />
                {/* Leave */}
                {role && (
                  <li>
                    <NavLink
                      to="/leave_management/leave"
                      style={setActive(active, "leave")}
                    >
                      <MdContacts className={styles.iconSidebar} />
                      <span> Leave</span>
                    </NavLink>
                  </li>
                )}

                <li>
                  <NavLink
                    to="/leave_management/leave_application"
                    style={setActive(active, "leave_application")}
                  >
                    <FaWpforms className={styles.iconSidebar} />
                    <span> Leave Applications</span>
                  </NavLink>
                </li>

                {role && (
                  <>
                    <SideBarTitle title="Onboarding Management" />

                    <li>
                      <NavLink
                        to="/onboarding_management/onboarding_sample"
                        style={setActive(active, "onboarding_sample")}
                      >
                        <BsFiles className={styles.iconSidebar} />
                        <span> Onboarding sample</span>
                      </NavLink>
                    </li>
                  </>
                )}

                <SideBarTitle title="Performance Management" />

                {role && (
                  <li>
                    <NavLink
                      to="/performance_management/performance"
                      style={setActive(active, "performance")}
                    >
                      <GrDocumentPerformance className={styles.iconSidebar} />
                      <span>Performance</span>
                    </NavLink>
                  </li>
                )}

                <li>
                  <NavLink
                    to="/performance_management/self_review"
                    style={setActive(active, "self_review")}
                  >
                    <MdOutlineRateReview className={styles.iconSidebar} />
                    <span>Self Review</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/performance_management/review"
                    style={setActive(active, "review")}
                  >
                    <IoIosPeople className={styles.iconSidebar} />
                    <span>Review for Staff</span>
                  </NavLink>
                </li>

                <SideBarTitle title="Request Management" />

                <li>
                  <NavLink
                    to="/request_management/request_properties"
                    style={setActive(active, "request_properties")}
                  >
                    <AiOutlineUser className={styles.iconSidebar} />
                    <span> Request Properties</span>
                  </NavLink>
                </li>

                <SideBarTitle title="Property Management" />

                {role && (
                  <>
                    <li>
                      <NavLink
                        to="/property_management/properties_group"
                        style={setActive(active, "properties_group")}
                      >
                        <FaLayerGroup className={styles.iconSidebar} />
                        <span>Properties Group</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/property_management/properties"
                        style={setActive(active, "properties")}
                      >
                        <GrPersonalComputer className={styles.iconSidebar} />
                        <span> Properties</span>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/property_management/property_providing_histories"
                        style={setActive(
                          active,
                          "property_providing_histories"
                        )}
                      >
                        <FaHistory className={styles.iconSidebar} />
                        <span> Providing Histories</span>
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </SidebarMenu>
          </SidebarInner>
        </div>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
