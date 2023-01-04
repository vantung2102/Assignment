import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptProperty,
  propertySelector,
  showProperty,
} from "../../../features/property/propertySlice";
import { ProfileView } from "../../StaffProfile/TopProfile/topProfile";
import FormAcceptRequestProperty from "./FormAcceptRequestProperty";

const DetailProperties = ({ idRequest }) => {
  const dispatch = useDispatch();
  const property = useSelector(propertySelector);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    dispatch(showProperty(idRequest));
  }, []);

  const handleRecall = () => {
    dispatch(acceptProperty({ id: idRequest }));
  };

  return (
    <Card className="mb-0">
      <Card.Header>
        {property?.status == "available" ? (
          <Button
            variant="success"
            className="me-4"
            onClick={() => setShow(true)}
          >
            Accept
          </Button>
        ) : (
          <Button variant="danger" onClick={handleRecall}>
            Recall
          </Button>
        )}
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
                        property?.status == "available" ? "success" : "danger"
                      }
                    >
                      {property?.status}
                    </Button>
                  </Col>
                </Form.Group>
                <Form.Group className="d-flex align-items-center mt-4">
                  <Col md={2}>
                    <Form.Label>Name</Form.Label>
                  </Col>
                  <Col md={10}>
                    <Form.Control defaultValue={property?.name} disabled />
                  </Col>
                </Form.Group>
                <Form.Group className="d-flex align-items-center mt-4">
                  <Col md={2}>
                    <Form.Label>Code Seri</Form.Label>
                  </Col>
                  <Col md={10}>
                    <Form.Control defaultValue={property?.code_seri} disabled />
                  </Col>
                </Form.Group>

                <Form.Group className="d-flex align-items-center mt-4">
                  <Col md={2}>
                    <Form.Label>Buy day</Form.Label>
                  </Col>
                  <Col md={10}>
                    <Form.Control defaultValue={property?.date_buy} disabled />
                  </Col>
                </Form.Group>
                <Form.Group className="d-flex align-items-center mt-4">
                  <Col md={2}>
                    <Form.Label>Number of repairs</Form.Label>
                  </Col>
                  <Col md={10}>
                    <Form.Control
                      defaultValue={property?.number_of_repairs}
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="d-flex align-items-center mt-4">
                  <Col md={2}>
                    <Form.Label>Price</Form.Label>
                  </Col>
                  <Col md={10}>
                    <Form.Control defaultValue={property?.price} disabled />
                  </Col>
                </Form.Group>
              </Row>
            </ProfileView>
          </Col>
        </Row>
      </Card.Body>
      <FormAcceptRequestProperty
        show={show}
        close={handleClose}
        id={idRequest}
      />
    </Card>
  );
};

export default DetailProperties;
