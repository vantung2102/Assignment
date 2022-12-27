import React, { useEffect } from "react";
import { Card, Col, Dropdown, FloatingLabel, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  requestPropertySelector,
  responseProperty,
  showRequestProperty,
} from "../../features/requestProperty/requestPropertySlice";
import { ProfileView } from "../StaffProfile/TopProfile/topProfile";
import Comment from "../Comment/Comment";

const DetailRequestProperty = ({ idRequest }) => {
  const dispatch = useDispatch();
  const requestProperty = useSelector(requestPropertySelector);

  useEffect(() => {
    dispatch(showRequestProperty(idRequest));
  }, []);

  const handleResponse = (id, type) => {
    const data = {
      id: id,
      type: type,
    };
    dispatch(responseProperty(data));
  };

  return (
    <>
      <Card className="mb-0">
        <Card.Body>
          <Row>
            <Col md={12}>
              <ProfileView>
                <Row>
                  <Col md={2}>
                    <Form.Group>
                      <Form.Label>Status</Form.Label>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant={
                            requestProperty?.attributes.status == "pending"
                              ? "warning"
                              : requestProperty?.attributes.status == "approved"
                              ? "success"
                              : "danger"
                          }
                        >
                          {requestProperty?.attributes.status}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() =>
                              handleResponse(idRequest, "approved")
                            }
                          >
                            Approved
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              handleResponse(idRequest, "cancelled")
                            }
                          >
                            Cancelled
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Type</Form.Label>
                      <Form.Control
                        defaultValue={requestProperty?.attributes?.request_type}
                        disabled
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Requester</Form.Label>
                      <Form.Control
                        defaultValue={
                          requestProperty?.attributes?.requester?.fullname
                        }
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Approver</Form.Label>
                      <Form.Control
                        defaultValue={
                          requestProperty?.attributes?.approver?.fullname
                        }
                        disabled
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Col md={12} className="mt-2">
                  <Form.Group>
                    <Form.Label>Detail</Form.Label>
                    <Form.Control
                      defaultValue={requestProperty?.attributes?.description}
                      style={{ height: "50px" }}
                      disabled
                    />
                  </Form.Group>
                </Col>

                <Col md={12} className="mt-2">
                  <Form.Group>
                    <Form.Label>Reason</Form.Label>
                    <FloatingLabel controlId="floatingTextarea2">
                      <Form.Control
                        as="textarea"
                        style={{ height: "100px" }}
                        defaultValue={requestProperty?.attributes?.reason}
                        disabled
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </ProfileView>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Comment
        commentable_id={idRequest}
        commentable_type={"RequestProperty"}
        comments={requestProperty?.attributes.comments}
        name={requestProperty?.attributes.requester.fullname}
      />
    </>
  );
};

export default DetailRequestProperty;
