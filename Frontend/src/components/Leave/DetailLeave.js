import React, { useEffect } from "react";
import { Card, Col, Row, Form, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { leaveSelector, showLeave } from "../../features/leave/leaveSlice";
import { ProfileView } from "../StaffProfile/TopProfile/topProfile";

const DetailLeave = ({ idRequest }) => {
  const dispatch = useDispatch();
  const leave = useSelector(leaveSelector);

  useEffect(() => {
    dispatch(showLeave(idRequest));
  }, []);
  return (
    <Card className="mb-0">
      <Card.Body>
        <Row>
          <Col md={12}>
            <ProfileView>
              <Row>
                <Form.Group className="d-flex align-items-center mt-4">
                  <Col md={2}>
                    <Form.Label>Staff:</Form.Label>
                  </Col>
                  <Col md={10}>
                    <Form.Control
                      defaultValue={leave?.attributes.staff.fullname}
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="d-flex align-items-center mt-4">
                  <Col md={2}>
                    <Form.Label>Casual leave:</Form.Label>
                  </Col>
                  <Col md={10}>
                    {leave?.attributes.casual_leave}/
                    <span className="text-danger">
                      {leave?.attributes.allowed_number_of_days_off}
                    </span>
                  </Col>
                </Form.Group>
                <Form.Group className="d-flex align-items-center mt-4">
                  <Col md={2}>
                    <Form.Label>Unpaid leave:</Form.Label>
                  </Col>
                  <Col md={10}>
                    {leave?.attributes.unpaid_leave}/
                    <span className="text-danger">15</span>
                  </Col>
                </Form.Group>
                <Form.Group className="d-flex align-items-center mt-4">
                  <Col md={2}>
                    <Form.Label>Marriage leave:</Form.Label>
                  </Col>
                  <Col md={10}>
                    {leave?.attributes.marriage_leave}/
                    <span className="text-danger">3</span>
                  </Col>
                </Form.Group>
                <Form.Group className="d-flex align-items-center mt-4">
                  <Col md={2}>
                    <Form.Label>Compassionate leave:</Form.Label>
                  </Col>
                  <Col md={10}>
                    {leave?.attributes.compassionate_leave}/
                    <span className="text-danger">3</span>
                  </Col>
                </Form.Group>
                <Form.Group className="d-flex align-items-center mt-4">
                  <Col md={2}>
                    <Form.Label>Paternity leave:</Form.Label>
                  </Col>
                  <Col md={10}>
                    {leave?.attributes.paternity_leave}/
                    <span className="text-danger">1</span>
                  </Col>
                </Form.Group>
                <Form.Group className="d-flex align-items-center mt-4">
                  <Col md={2}>
                    <Form.Label>Maternity leave:</Form.Label>
                  </Col>
                  <Col md={10}>
                    {leave?.attributes.maternity_leave}/
                    <span className="text-danger">6 months</span>
                  </Col>
                </Form.Group>
                <Form.Group className="d-flex align-items-center mt-4">
                  <Col md={2}>
                    <Form.Label>Description:</Form.Label>
                  </Col>
                  <Col md={10}>
                    <FloatingLabel controlId="floatingTextarea2">
                      <Form.Control
                        as="textarea"
                        style={{ height: "100px" }}
                        defaultValue={leave?.attributes.description}
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

export default DetailLeave;
