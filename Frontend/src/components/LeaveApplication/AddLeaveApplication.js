import React, { useState } from "react";
import FormLeaveApplication from "./FormLeaveApplication";
import common from "../../global/module/common.module.scss";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUserSelector } from "../../features/auth/authSlice";
import {
  leaveByUser,
  leaveCurrentUserSelector,
} from "../../features/leave/leaveSlice";

const AddLeaveApplication = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getUserSelector);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    dispatch(leaveByUser(currentUser.id));
    setShow(true);
  };

  return (
    <div className="col-auto float-end ml-auto">
      <Button className={common.AddBtn} onClick={handleShow}>
        <FaPlus style={{ lineHeight: "38px" }} /> Add Leave Application
      </Button>

      <FormLeaveApplication isNew={true} show={show} close={handleClose} />
    </div>
  );
};

export default AddLeaveApplication;
