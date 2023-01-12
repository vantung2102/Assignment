import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserSelector } from "../../../features/auth/authSlice";
import {
  acceptProperty,
  propertySelector,
  showProperty,
} from "../../../features/property/propertySlice";
import { ProfileView } from "../../StaffProfile/TopProfile/topProfile";
import ColumnProperty from "./ColumnProperty";
import FormAcceptRequestProperty from "./FormAcceptRequestProperty";

const DetailProperties = ({ idRequest }) => {
  const dispatch = useDispatch();
  const property = useSelector(propertySelector);
  const [show, setShow] = useState(false);
  const [code, setCode] = useState(null);
  const [name, setName] = useState(null);
  const [brand, setBrand] = useState(null);
  const [numberOfRepairs, setNumberOfRepairs] = useState(null);
  const [status, setStatus] = useState(null);
  const [buyDay, setBuyDay] = useState(null);
  const [price, setPrice] = useState(null);
  const [groupProperty, setGroupProperty] = useState(null);

  const handleClose = () => setShow(false);

  useEffect(() => {
    dispatch(showProperty(idRequest));
  }, [dispatch]);

  useEffect(() => {
    if (!property) return;

    const {
      code_seri,
      name,
      brand,
      group_property,
      price,
      date_buy,
      number_of_repairs,
      status,
    } = property;

    setCode(code_seri);
    setName(name);
    setBrand(brand);
    setNumberOfRepairs(number_of_repairs);
    setStatus(status);
    setPrice(price);
    setBuyDay(date_buy);
    setGroupProperty(group_property.name);
  }, [property]);

  const handleRecall = () => {
    // dispatch(acceptProperty({ id: idRequest, receiver_id: currentUser?.id }));
  };

  return (
    <Card className="mb-0">
      <Card.Header>
        {status === "available" ? (
          <Button
            variant="success"
            className="me-4"
            onClick={() => setShow(true)}
          >
            Assign
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
                        status === "available"
                          ? "outline-success"
                          : "outline-danger"
                      }
                    >
                      {status}
                    </Button>
                  </Col>
                </Form.Group>

                <ColumnProperty title="Name" value={name} />
                <ColumnProperty title="Code Seri" value={code} />
                <ColumnProperty title="Brand" value={brand} />
                <ColumnProperty title="Group Property" value={groupProperty} />

                <ColumnProperty title="Buy day" value={buyDay} />
                <ColumnProperty
                  title="Number of repairs"
                  value={numberOfRepairs}
                />
                <ColumnProperty title="Price" value={price} />
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
