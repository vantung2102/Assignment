import React, { useState } from "react";

import common from "../../global/module/common.module.scss";

// =========== Icon =================
import { IoAppsSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { HiOutlineBars3 } from "react-icons/hi2";
import { ViewIcons } from "./staff";
import { useDispatch } from "react-redux";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import { SubmitSection } from "../Department/department";
import { Link } from "react-router-dom";
import FormStaff from "./FormStaff";

const AddStaff = () => {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const handleNewPosition = () => {
    const data = {
      name: position,
      description: description,
    };
    // dispatch(newPositAsync(data));
  };

  return (
    <div className="col-auto float-end ml-auto">
      <div className="col-auto float-end ml-auto">
        <Button className={common.AddBtn} onClick={handleShow}>
          <FaPlus style={{ lineHeight: "38px" }} /> Add Employee
        </Button>

        <FormStaff isNew={true} show={show} close={handleClose} />
      </div>

      <ViewIcons>
        <Link className="grid-view btn btn-link active">
          <IoAppsSharp />
        </Link>
        <Link className="list-view btn btn-link">
          <HiOutlineBars3 />
        </Link>
      </ViewIcons>
    </div>
  );
};

export default AddStaff;
