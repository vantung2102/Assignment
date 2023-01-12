import React, { useEffect, useState } from "react";
import {
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
  requestPropertySelector,
  responseProperty,
  showRequestProperty,
} from "../../features/requestProperty/requestPropertySlice";
import { ProfileView } from "../StaffProfile/TopProfile/topProfile";
import Comment from "../Comment/Comment";
import { getRoleSelector } from "../../features/auth/authSlice";

const DetailRequestProperty = ({ idRequest }) => {
  const dispatch = useDispatch();
  const requestProperty = useSelector(requestPropertySelector);
  const role = useSelector(getRoleSelector);
  const [status, setStatus] = useState(null);
  const [type, setType] = useState(null);
  const [requester, setRequester] = useState(null);
  const [approver, setApprover] = useState(null);
  const [reason, setReason] = useState(null);
  const [description, setDescription] = useState(null);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    dispatch(showRequestProperty(idRequest));
  }, [dispatch]);

  useEffect(() => {
    if (!requestProperty) return;

    const {
      status,
      request_type,
      requester,
      approver,
      reason,
      description,
      comments,
    } = requestProperty.attributes;

    setStatus(status);
    setType(request_type);
    setRequester(requester?.fullname);
    setApprover(approver?.fullname);
    setReason(reason);
    setDescription(description);
    setComment(comments);
  }, [requestProperty]);

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
        {role && (
          <Card.Header>
            <Button
              size="sm"
              variant="success"
              className="me-4"
              onClick={() => handleResponse(idRequest, "approved")}
            >
              Approved
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => handleResponse(idRequest, "cancelled")}
            >
              Cancel
            </Button>
          </Card.Header>
        )}
        <Card.Body>
          <Row>
            <Col md={12}>
              <ProfileView>
                <Row>
                  <Col md={2}>
                    <Form.Group>
                      <Form.Label>Status</Form.Label>
                      <Button
                        style={{ width: "100%" }}
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
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Type</Form.Label>
                      <Form.Control defaultValue={type} disabled />
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Requester</Form.Label>
                      <Form.Control defaultValue={requester} disabled />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Approver</Form.Label>
                      <Form.Control defaultValue={approver} disabled />
                    </Form.Group>
                  </Col>
                </Row>

                <Col md={12} className="mt-2">
                  <Form.Group>
                    <Form.Label>Detail</Form.Label>
                    <Form.Control
                      defaultValue={description}
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
                        defaultValue={reason}
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
        comments={comment}
      />
    </>
  );
};

export default DetailRequestProperty;
