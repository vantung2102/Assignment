import React from "react";

import common from "../../global/module/common.module.scss";

// =========== Icon =================
import { IoAppsSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { HiOutlineBars3 } from "react-icons/hi2";
import { ViewIcons } from "./staff";

const AddStaff = () => {
  return (
    <div className="col-auto float-end ml-auto">
      <a
        href="#"
        className={["btn", common.AddBtn].join(" ")}
        data-bs-toggle="modal"
        data-bs-target="#add_employee"
      >
        <FaPlus style={{ lineHeight: "38px" }} /> Add Employee
      </a>
      <ViewIcons>
        <a className="grid-view btn btn-link active" href="">
          <IoAppsSharp />
        </a>
        <a className="list-view btn btn-link" href="">
          <HiOutlineBars3 />
        </a>
      </ViewIcons>
    </div>
  );
};

export default AddStaff;
