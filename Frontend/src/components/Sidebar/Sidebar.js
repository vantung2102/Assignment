import React from "react";
// =========== Style =========
import styles from "./sidebar.module.scss";
import { SidebarContainer, SidebarInner, SidebarMenu } from "./sidebar";
// =========== Icon =========
import { RxDashboard } from "react-icons/rx";
import { IoIosArrowForward } from "react-icons/io";
import { BiCube } from "react-icons/bi";
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

const Sidebar = () => {
  return (
    <SidebarContainer style={{ overflowY: "auto" }}>
      <div>
        <div>
          <SidebarInner>
            <SidebarMenu>
              <ul>
                <li className={styles.menuTitle}>
                  <span>Main</span>
                </li>

                <li className="submenu">
                  <a href="#" className="">
                    <RxDashboard className={styles.iconSidebar} />
                    <span> Dashboard</span>
                    <span className="menu-arrow">
                      <IoIosArrowForward />
                    </span>
                  </a>
                </li>

                <li className="submenu">
                  <a href="#" className="">
                    <BiCube className={styles.iconSidebar} />
                    <span> Apps</span>
                    <span className="menu-arrow">
                      <IoIosArrowForward />
                    </span>
                  </a>
                </li>

                <li className={styles.menuTitle}>
                  <span> Staff Management</span>
                </li>

                <li className="submenu">
                  <a href="#" className="">
                    <MdOutlineHomeRepairService
                      className={styles.iconSidebar}
                    />
                    <span> Departments</span>
                    <span className="menu-arrow">
                      <IoIosArrowForward />
                    </span>
                  </a>
                </li>

                <li className="submenu">
                  <a href="#" className="">
                    <MdOutlineTitle className={styles.iconSidebar} />
                    <span> Job Title</span>
                    <span className="menu-arrow">
                      <IoIosArrowForward />
                    </span>
                  </a>
                </li>

                <li className="submenu">
                  <a href="#" className="">
                    <GiStairsGoal className={styles.iconSidebar} />
                    <span> Positions</span>
                    <span className="menu-arrow">
                      <IoIosArrowForward />
                    </span>
                  </a>
                </li>

                <li className="submenu">
                  <a href="#" className="">
                    <MdContacts className={styles.iconSidebar} />
                    <span> Contacts</span>
                    <span className="menu-arrow">
                      <IoIosArrowForward />
                    </span>
                  </a>
                </li>

                <li className="submenu">
                  <a href="#" className="">
                    <AiOutlineUser className={styles.iconSidebar} />
                    <span> Staff</span>
                    <span className="menu-arrow">
                      <IoIosArrowForward />
                    </span>
                  </a>
                </li>

                <li className={styles.menuTitle}>
                  <span> Leave Management</span>
                </li>

                <li className="submenu">
                  <a href="#" className="">
                    <MdContacts className={styles.iconSidebar} />
                    <span> Leave</span>
                  </a>
                </li>

                <li className="submenu">
                  <a href="#" className="">
                    <FaWpforms className={styles.iconSidebar} />
                    <span> Leave Applications</span>
                  </a>
                </li>

                <li className={styles.menuTitle}>
                  <span> Onboarding Management</span>
                </li>

                <li className="submenu">
                  <a href="#" className="">
                    <BsFiles className={styles.iconSidebar} />
                    <span> Onboarding sample</span>
                  </a>
                </li>

                <li className="submenu">
                  <a href="#" className="">
                    <AiOutlineUsergroupAdd className={styles.iconSidebar} />
                    <span> Staff onboarding</span>
                  </a>
                </li>

                <li className={styles.menuTitle}>
                  <span> Performance Management</span>
                </li>

                <li className="submenu">
                  <a href="#" className="">
                    <FcSalesPerformance className={styles.iconSidebar} />
                    <span> Forms</span>
                  </a>
                </li>

                <li className={styles.menuTitle}>
                  <span> Request Management</span>
                </li>

                <li className="submenu">
                  <a href="#" className="">
                    <AiOutlineUser className={styles.iconSidebar} />
                    <span> Request Properties</span>
                  </a>
                </li>

                <li className={styles.menuTitle}>
                  <span> Property Management</span>
                </li>

                <li className="submenu">
                  <a href="#" className="">
                    <FaLayerGroup className={styles.iconSidebar} />
                    <span> Group Properties</span>
                  </a>
                </li>

                <li className="submenu">
                  <a href="#" className="">
                    <GrPersonalComputer className={styles.iconSidebar} />
                    <span> Properties</span>
                  </a>
                </li>

                <li className="submenu">
                  <a href="#" className="">
                    <FaHistory className={styles.iconSidebar} />
                    <span> Providing Histories</span>
                  </a>
                </li>

                <li className={styles.menuTitle}>
                  <span> Hr Management</span>
                </li>

                <li className="submenu">
                  <a href="#" className="">
                    <MdOutlineAccountCircle className={styles.iconSidebar} />
                    <span> Accounting</span>
                  </a>
                </li>

                <li className="submenu">
                  <a href="#" className="">
                    <FaMoneyBillAlt className={styles.iconSidebar} />
                    <span> Payroll</span>
                  </a>
                </li>

                <li className="submenu">
                  <a href="#" className="">
                    <AiOutlineFileProtect className={styles.iconSidebar} />
                    <span> Policy</span>
                  </a>
                </li>

                <li className="submenu">
                  <a href="#" className="">
                    <MdReportGmailerrorred className={styles.iconSidebar} />
                    <span> Report</span>
                  </a>
                </li>

                <li className={styles.menuTitle}>
                  <span> Project Management</span>
                </li>

                <li className="submenu">
                  <a href="#" className="">
                    <GrTask className={styles.iconSidebar} />
                    <span> Tasks</span>
                  </a>
                </li>

                <li className="submenu">
                  <a href="#" className="">
                    <AiOutlineFundProjectionScreen
                      className={styles.iconSidebar}
                    />
                    <span> Projection</span>
                  </a>
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
