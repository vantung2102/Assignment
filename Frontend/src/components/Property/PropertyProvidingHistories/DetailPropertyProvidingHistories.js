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
import ColumnProperty from "../DetailProperties/ColumnProperty";

const DetailPropertyProvidingHistories = ({ idRequest }) => {
  const dispatch = useDispatch();
  const history = useSelector(PropertyProvidingHistorySelector);
  const [status, setStatus] = useState(null);
  const [provider, setProvider] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [code, setCode] = useState(null);
  const [name, setName] = useState(null);
  const [brand, setBrand] = useState(null);
  const [numberOfRepairs, setNumberOfRepairs] = useState(null);
  const [statusProperty, setStatusProperty] = useState(null);
  const [buyDay, setBuyDay] = useState(null);
  const [price, setPrice] = useState(null);
  const [groupProperty, setGroupProperty] = useState(null);

  useEffect(() => {
    dispatch(showPropertyProvidingHistory(idRequest));
  }, [dispatch]);

  useEffect(() => {
    if (!history) return;

    const { status, property, provider, receiver } = history.attributes;

    setStatus(status);
    setProvider(property.fullname);
    setReceiver(receiver.fullname);
    setCode(property?.code_seri);
    setName(property?.name);
    setBrand(property?.brand);
    setNumberOfRepairs(property?.number_of_repairs);
    setStatusProperty(property?.status);
    setPrice(property?.price);
    setBuyDay(property?.date_buy);
  }, [history]);

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
                      variant={
                        status === "recall"
                          ? "outline-success"
                          : "outline-danger"
                      }
                    >
                      {status === "recall" ? "recalled" : "provided"}
                    </Button>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Property</Form.Label>
                    <Form.Control defaultValue={name} disabled />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Provider</Form.Label>
                    <Form.Control defaultValue={provider} disabled />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Receiver</Form.Label>
                    <Form.Control defaultValue={receiver} disabled />
                  </Form.Group>
                </Col>
                <Col md={12} className="mt-4">
                  <Form.Label>Detail Property</Form.Label>
                </Col>
                <>
                  <ColumnProperty title="Name" value={name} />
                  <ColumnProperty title="Code Seri" value={code} />
                  <ColumnProperty title="Brand" value={brand} />

                  <ColumnProperty title="Buy day" value={buyDay} />
                  <ColumnProperty
                    title="Number of repairs"
                    value={numberOfRepairs}
                  />
                  <ColumnProperty title="Price" value={price} />
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
