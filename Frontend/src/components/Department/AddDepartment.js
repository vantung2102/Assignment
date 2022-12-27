import React, { useState } from "react";
import common from "../../global/module/common.module.scss";

// =========== Icon =================
import { Button } from "react-bootstrap";

import "react-toastify/dist/ReactToastify.css";
import { FaPlus } from "react-icons/fa";
import FormDepartment from "./FormDepartment";

const AddDepartment = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="col-auto float-end ml-auto">
      <Button className={common.AddBtn} onClick={handleShow}>
        <FaPlus style={{ lineHeight: "38px" }} /> Add Department
      </Button>

      <FormDepartment isNew={true} show={show} close={handleClose} />
    </div>
  );
};

export default AddDepartment;
