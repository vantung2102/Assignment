import React, { useEffect } from "react";
import { Button, Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  leaveApplicationSelector,
  showLeaveApplication,
  responseLeaveApplication,
} from "../../features/leaveApplication/leaveApplicationSlice";
import { ProfileView } from "../StaffProfile/TopProfile/topProfile";

const DetailLeaveApplication = ({ idRequest }) => {
  const dispatch = useDispatch();
  const status = {
    pending: 0,
    approve: 1,
    cancel: 2,
  };
  const leaveApplication = useSelector(leaveApplicationSelector);

  useEffect(() => {
    dispatch(showLeaveApplication(idRequest));
  }, []);

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
      <Card.Header>
        <Button
          variant="success"
          className="me-4"
          onClick={() => handleResponse(status.approve)}
        >
          Approve
        </Button>
        <Button variant="danger" onClick={() => handleResponse(status.cancel)}>
          Cancel
        </Button>
      </Card.Header>
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
                      variant={
                        leaveApplication?.attributes.status === "pending"
                          ? "warning"
                          : leaveApplication?.attributes.status === "approved"
                          ? "success"
                          : "danger"
                      }
                    >
                      {" "}
                      {leaveApplication?.attributes.status}
                    </Button>
                  </Col>
                </Form.Group>
                <Form.Group className="d-flex align-items-center mt-4">
                  <Col md={2}>
                    <Form.Label>Approver</Form.Label>
                  </Col>
                  <Col md={10}>
                    <Form.Control
                      defaultValue={
                        leaveApplication?.attributes?.approver?.fullname
                      }
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="d-flex align-items-center mt-4">
                  <Col md={2}>
                    <Form.Label>Staff</Form.Label>
                  </Col>
                  <Col md={10}>
                    <Form.Control
                      defaultValue={leaveApplication?.attributes.staff.fullname}
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="d-flex align-items-center mt-4">
                  <Col md={2}>
                    <Form.Label>Leave type</Form.Label>
                  </Col>
                  <Col md={10}>
                    <Form.Control
                      defaultValue={leaveApplication?.attributes.leave_type}
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="d-flex align-items-center mt-4">
                  <Col md={2}>
                    <Form.Label>Start day</Form.Label>
                  </Col>
                  <Col md={10}>
                    <Form.Control
                      defaultValue={leaveApplication?.attributes.start_day}
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="d-flex align-items-center mt-4">
                  <Col md={2}>
                    <Form.Label>End day</Form.Label>
                  </Col>
                  <Col md={10}>
                    <Form.Control
                      defaultValue={leaveApplication?.attributes.end_day}
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="d-flex align-items-center mt-4">
                  <Col md={2}>
                    <Form.Label>number_of_days_off</Form.Label>
                  </Col>
                  <Col md={10}>
                    <Form.Control
                      defaultValue={
                        leaveApplication?.attributes.number_of_days_off
                      }
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="d-flex align-items-center mt-4">
                  <Col md={2}>
                    <Form.Label>Reason</Form.Label>
                  </Col>
                  <Col md={10}>
                    <FloatingLabel controlId="floatingTextarea2">
                      <Form.Control
                        as="textarea"
                        style={{ height: "100px" }}
                        defaultValue={leaveApplication?.attributes.description}
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
