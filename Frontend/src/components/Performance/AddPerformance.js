import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateAllActiveOrInactive } from "../../features/performance/performanceSlice";
import common from "../../global/module/common.module.scss";
import FormPerformance from "./FormPerformance";

const AddPerformance = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const handleEndPerformance = () => {
    dispatch(updateAllActiveOrInactive({ active: false }));
  };

  return (
    <div className="col-auto float-end ml-auto">
      <Button className={common.AddBtn} onClick={handleShow}>
        <FaPlus style={{ lineHeight: "38px" }} /> Start Performance
      </Button>

      <Button onClick={handleEndPerformance} className="me-4">
        End Performance
      </Button>

      <FormPerformance isNew={true} show={show} close={handleClose} />
    </div>
  );
};

export default AddPerformance;
