import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import FormPropertiesGroup from "./FormPropertiesGroup";
import common from "../../../global/module/common.module.scss";

const AddPropertiesGroup = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="col-auto float-end ml-auto">
      <Button className={common.AddBtn} onClick={handleShow}>
        <FaPlus style={{ lineHeight: "38px" }} /> Add Property Group
      </Button>

      <FormPropertiesGroup isNew={true} show={show} close={handleClose} />
    </div>
  );
};

export default AddPropertiesGroup;
