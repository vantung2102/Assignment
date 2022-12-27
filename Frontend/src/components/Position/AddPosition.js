import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

import common from "../../global/module/common.module.scss";
import "react-toastify/dist/ReactToastify.css";
import {
  departmentsSelector,
  fetchDepartment,
} from "../../features/department/departmentSlice";
import FormPosition from "./FormPosition";

const AddPosition = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="col-auto float-end ml-auto">
      <Button className={common.AddBtn} onClick={handleShow}>
        <FaPlus style={{ lineHeight: "38px" }} /> Add position
      </Button>

      <FormPosition isNew={true} show={show} close={handleClose} />
    </div>
  );
};

export default AddPosition;
