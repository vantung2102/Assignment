import React from "react";
import styles from "./sidebar.module.scss";

const SideBarTitle = ({ title }) => {
  return (
    <li className={styles.menuTitle}>
      <span>{title}</span>
    </li>
  );
};

export default SideBarTitle;
