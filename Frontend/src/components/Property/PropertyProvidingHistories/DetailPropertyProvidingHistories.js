import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  PropertyProvidingHistorySelector,
  propertyRecall,
  showPropertyProvidingHistory,
} from "../../../features/propertyProvidingHistories/propertyProvidingHistoriesSlice";
import { ProfileView } from "../../StaffProfile/TopProfile/topProfile";

const DetailPropertyProvidingHistories = ({ idRequest }) => {
  const dispatch = useDispatch();
  const history = useSelector(PropertyProvidingHistorySelector);

  useEffect(() => {
    dispatch(showPropertyProvidingHistory(idRequest));
  }, []);

  const handleRecall = (id) => {
    dispatch(propertyRecall(id));
  };

  return (
    <Card className="mb-0">
      <Card.Body>
        <Row>
          <Col md={12}>
            <ProfileView>
              <Row>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label style={{ width: "100%" }}>Status</Form.Label>
                    <Button
                      variant="danger"
                      disabled={
                        history?.attributes.status == "recall" ? true : false
                      }
                      onClick={() => handleRecall(idRequest)}
                    >
                      Recalled
                    </Button>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Property</Form.Label>
                    <Form.Control
                      defaultValue={history?.attributes.property.name}
                      disabled
                    />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Provider</Form.Label>
                    <Form.Control
                      defaultValue={history?.attributes?.provider?.fullname}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Receiver</Form.Label>
                    <Form.Control
                      defaultValue={history?.attributes?.receiver?.fullname}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col md={12} className="mt-4">
                  <Form.Label>Detail Property</Form.Label>
                </Col>
                <>
                  <Form.Group className="d-flex align-items-center mt-4">
                    <Col md={2}>
                      <Form.Label>Name</Form.Label>
                    </Col>
                    <Col md={10}>
                      <Form.Control
                        defaultValue={history?.attributes.property.name}
                        disabled
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="d-flex align-items-center mt-4">
                    <Col md={2}>
                      <Form.Label>Code Seri</Form.Label>
                    </Col>
                    <Col md={10}>
                      <Form.Control
                        defaultValue={history?.attributes.property.code_seri}
                        disabled
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="d-flex align-items-center mt-4">
                    <Col md={2}>
                      <Form.Label>Buy day</Form.Label>
                    </Col>
                    <Col md={10}>
                      <Form.Control
                        defaultValue={history?.attributes.property.date_buy}
                        disabled
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="d-flex align-items-center mt-4">
                    <Col md={2}>
                      <Form.Label>number_of_repairs</Form.Label>
                    </Col>
                    <Col md={10}>
                      <Form.Control
                        defaultValue={
                          history?.attributes.property.number_of_repairs
                        }
                        disabled
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="d-flex align-items-center mt-4">
                    <Col md={2}>
                      <Form.Label>Price</Form.Label>
                    </Col>
                    <Col md={10}>
                      <Form.Control
                        defaultValue={history?.attributes.property.price}
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </>
              </Row>
            </ProfileView>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DetailPropertyProvidingHistories;
