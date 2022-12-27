import React, { useEffect } from "react";
import { Card, Col, Dropdown, FloatingLabel, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  requestPropertySelector,
  showRequestProperty,
} from "../../features/requestProperty/requestPropertySlice";
import { ProfileView } from "../StaffProfile/TopProfile/topProfile";
import { BiConfused } from "react-icons/bi";

const DetailRequestProperty = ({ idRequest }) => {
  const dispatch = useDispatch();
  const requestProperty = useSelector(requestPropertySelector);
  console.log(requestProperty);

  console.log(idRequest);
  useEffect(() => {
    dispatch(showRequestProperty(idRequest));
  }, []);
  return (
    <>
      <Card className="mb-0">
        <Card.Body>
          <Row>
            <Col md={12}>
              <ProfileView>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Status</Form.Label>
                      <Form.Control value={requestProperty?.id} disabled />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Type</Form.Label>
                      <Form.Control
                        value={requestProperty?.attributes?.request_type}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Reason</Form.Label>
                      <Form.Control
                        value={requestProperty?.attributes?.reason}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Reason</Form.Label>
                      <Form.Control
                        value={requestProperty?.attributes?.reason}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Requester</Form.Label>
                      <Form.Control
                        value={requestProperty?.attributes?.requester?.fullname}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Approver</Form.Label>
                      <Form.Control
                        value={requestProperty?.attributes?.approver?.fullname}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <FloatingLabel controlId="floatingTextarea2">
                        <Form.Control
                          as="textarea"
                          style={{ height: "100px" }}
                          value={requestProperty?.attributes?.description}
                          disabled
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>
              </ProfileView>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mt-2">
        <Card.Header>
          <div className="d-flex align-items-center">
            <div className="avatar me-3">
              <img src="assets/images/faces/1.jpg" alt="" srcset="" />
              <span className="avatar-status bg-success"></span>
            </div>
            <div className="name flex-grow-1">
              <h6 className="mb-0">Zane</h6>
              <span className="text-xs">Online</span>
            </div>
          </div>
        </Card.Header>
        <Card.Body className="pt-4 bg-grey">
          {/* <div className="chat-content">
            <div className="chat">
              <div className="chat-body">
                <div className="chat-message">Hi Alfy, how can i help you?</div>
              </div>
            </div>
            <div className="chat chat-left">
              <div className="chat-body">
                <div className="chat-message">
                  I'm looking for the best admin dashboard template
                </div>
                <div className="chat-message">With bootstrap certainly</div>
              </div>
            </div>
            <div className="chat">
              <div className="chat-body">
                <div className="chat-message">
                  I recommend you to use Mazer Dashboard
                </div>
              </div>
            </div>
            <div className="chat chat-left">
              <div className="chat-body">
                <div className="chat-message">
                  That"s great! I like it so much :)
                </div>
              </div>
            </div>
          </div> */}
        </Card.Body>
        <Card.Footer>
          <div className="message-form d-flex flex-direction-column align-items-center">
            <BiConfused />
            {/* <div className="d-flex flex-grow-1 ml-4"> */}
            <Form className="d-flex flex-grow-1 ml-4">
              <Form.Control placeholder="Type your message.." />
            </Form>
            {/* </div> */}
          </div>
        </Card.Footer>
      </Card>
    </>
  );
};

export default DetailRequestProperty;
