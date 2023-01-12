import React, { useState } from "react";
import common from "../../global/module/common.module.scss";
// =========== Icon =================
import { FaPlus } from "react-icons/fa";
import { Button } from "react-bootstrap";
import FormStaff from "./FormStaff";
import { RiDeleteBinLine } from "react-icons/ri";

const AddStaff = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="col-auto float-end ml-auto">
      <div className="col-auto float-end ml-auto">
        <Button className={common.AddBtn} onClick={handleShow}>
          <FaPlus style={{ lineHeight: "38px" }} /> Add Employee
        </Button>

        <FormStaff isNew={true} show={show} close={handleClose} />
      </div>
    </div>
  );
};

export default AddStaff;
