import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormLeaveApplication from "./FormLeaveApplication";
import {
  destroyLeaveApplication,
  fetchLeaveApplication,
  leaveApplicationByStatus,
  leaveApplicationByUser,
  leaveApplicationsSelector,
} from "../../features/leaveApplication/leaveApplicationSlice";
import { Link } from "react-router-dom";
import { TableCell, TableComponent } from "../../global/jsx/common";
import TableHead from "../Table/TableHead";
import {
  getRoleSelector,
  getUserSelector,
} from "../../features/auth/authSlice";
import { RiDeleteBinLine } from "react-icons/ri";
import { Popconfirm } from "antd";
import Select from "react-select";

const LeaveApplication = () => {
  const dispatch = useDispatch();
  const role = useSelector(getRoleSelector);
  const currentUser = useSelector(getUserSelector);
  const leaveApplications = useSelector(leaveApplicationsSelector);
  const [show, setShow] = useState(false);

  const statusList = [
    { label: "Pending", value: 0 },
    { label: "Approve", value: 1 },
    { label: "Cancel", value: 2 },
  ];

  useEffect(() => {
    if (!currentUser) return;
    !role
      ? dispatch(leaveApplicationByUser(currentUser?.id))
      : dispatch(fetchLeaveApplication());
  }, [dispatch, role, currentUser]);

  const handleClose = () => setShow(false);

  const handleDelete = (id) => {
    dispatch(destroyLeaveApplication(id));
  };

  const handleFilter = (val) => {
    dispatch(leaveApplicationByStatus(val));
  };

  return (
    <>
      <Row className="justify-content-end mb-4">
        <Col md={3} sm={6}>
          <Form.Group>
            <Select
              name="position"
              options={statusList}
              placeholder="Select Status"
              onChange={(e) => handleFilter(e.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <TableComponent>
            <thead>
              <tr>
                <TableHead title="STT" />
                <TableHead title="Name" />
                <TableHead title="Start day" />
                <TableHead title="End day" />
                <TableHead title="status" />
                <TableHead title="Number of day" />
                <TableHead title="Action" />
              </tr>
            </thead>
            <tbody>
              {leaveApplications?.map((item, index) => {
                const {
                  id,
                  staff,
                  end_day,
                  start_day,
                  status,
                  number_of_days_off,
                } = item.attributes;
                return (
                  <tr key={id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {!role ? (
                        staff.fullname
                      ) : (
                        <Link to={item.id}>{staff.fullname}</Link>
                      )}
                    </TableCell>
                    <TableCell>{start_day}</TableCell>
                    <TableCell>{end_day}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant={
                          status === "pending"
                            ? "outline-warning"
                            : status === "approved"
                            ? "outline-success"
                            : "outline-danger"
                        }
                      >
                        {status}
                      </Button>
                    </TableCell>
                    <TableCell>{number_of_days_off}</TableCell>
                    <TableCell>
                      <Popconfirm
                        title="Are you sure?"
                        onConfirm={() => handleDelete(id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <RiDeleteBinLine />
                      </Popconfirm>
                    </TableCell>
                  </tr>
                );
              })}
            </tbody>
          </TableComponent>
        </Col>

        <FormLeaveApplication isNew={false} show={show} close={handleClose} />
      </Row>
    </>
  );
};

export default LeaveApplication;
