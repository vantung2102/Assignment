import React, { useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import common from "../../global/module/common.module.scss";
import { SubmitSection } from "../Department/department";
import FormJobTitle from "./FormJobTitle";

const AddJobTitle = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="col-auto float-end ml-auto">
      <Button className={common.AddBtn} onClick={handleShow}>
        <FaPlus style={{ lineHeight: "38px" }} /> Add JobTitle
      </Button>

      <FormJobTitle isNew={true} show={show} close={handleClose} />
    </div>
  );
};

export default AddJobTitle;
