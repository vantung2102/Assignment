import React, { useEffect, useState } from "react";
import { Button, Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  leaveApplicationSelector,
  showLeaveApplication,
  responseLeaveApplication,
} from "../../features/leaveApplication/leaveApplicationSlice";
import { ColumnDetail } from "../Leave/ColumnDetail";
import { ProfileView } from "../StaffProfile/TopProfile/topProfile";

const DetailLeaveApplication = ({ idRequest }) => {
  const dispatch = useDispatch();
  const leaveApplication = useSelector(leaveApplicationSelector);
  const [statusLeave, setStatusLeave] = useState(null);
  const [approver, setApprover] = useState(null);
  const [requester, setRequester] = useState(null);
  const [type, setType] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [number, setNumber] = useState(null);
  const [reason, setReason] = useState(null);

  const status = {
    pending: 0,
    approve: 1,
    cancel: 2,
  };

  useEffect(() => {
    dispatch(showLeaveApplication(idRequest));
  }, [dispatch]);

  useEffect(() => {
    if (!leaveApplication) return;
    const {
      status,
      approver,
      staff,
      number_of_days_off,
      leave_type,
      end_day,
      start_day,
      description,
    } = leaveApplication.attributes;

    setStatusLeave(status);
    setApprover(approver?.fullname);
    setRequester(staff?.fullname);
    setType(leave_type);
    setStartDate(start_day);
    setEndDate(end_day);
    setReason(description);
    setNumber(number_of_days_off);
  }, [leaveApplication]);

  const handleResponse = (status) => {
    dispatch(
      responseLeaveApplication({
        id: idRequest,
        status: status,
      })
    );
  };

  return (
    <Card className="mb-0">
      {statusLeave === "pending" ? (
        <Card.Header>
          <Button
            variant="success"
            className="me-4"
            onClick={() => handleResponse(status.approve)}
          >
            Approve
          </Button>
          <Button
            variant="danger"
            onClick={() => handleResponse(status.cancel)}
          >
            Cancel
          </Button>
        </Card.Header>
      ) : null}

      <Card.Body>
        <Row>
          <Col md={12}>
            <ProfileView>
              <Row>
                <Form.Group className="d-flex align-items-center mt-4">
                  <Col md={2}>
                    <Form.Label>Status</Form.Label>
                  </Col>
                  <Col md={10}>
                    <Button
                      sm="sm"
                      variant={
                        statusLeave === "pending"
                          ? "outline-warning"
                          : statusLeave === "approved"
                          ? "outline-success"
                          : "outline-danger"
                      }
                    >
                      {statusLeave}
                    </Button>
                  </Col>
                </Form.Group>

                <ColumnDetail
                  title="Approver"
                  value={approver}
                  disabled={true}
                />

                <ColumnDetail
                  title="Requester"
                  value={requester}
                  disabled={true}
                />

                <ColumnDetail title="Leave type" value={type} disabled={true} />

                <ColumnDetail
                  title="Start day"
                  value={startDate}
                  disabled={true}
                />
                <ColumnDetail title="End day" value={endDate} disabled={true} />

                <ColumnDetail
                  title="number of days"
                  value={number}
                  disabled={true}
                />

                <Form.Group className="d-flex align-items-center mt-4">
                  <Col md={2}>
                    <Form.Label>Reason</Form.Label>
                  </Col>
                  <Col md={10}>
                    <FloatingLabel controlId="floatingTextarea2">
                      <Form.Control
                        as="textarea"
                        style={{ height: "100px" }}
                        defaultValue={reason}
                        disabled
                      />
                    </FloatingLabel>
                  </Col>
                </Form.Group>
              </Row>
            </ProfileView>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DetailLeaveApplication;
