import React, { useEffect, useState } from "react";
import { Button, Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  editSelfReview,
  performanceSelector,
  showPerformance,
} from "../../features/performance/performanceSlice";
import EmptyData from "../Empty/EmptyData";
import question from "./question";

const Performance = ({ idRequest }) => {
  const dispatch = useDispatch();
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [question4, setQuestion4] = useState("");
  const [question5, setQuestion5] = useState("");
  const [question6, setQuestion6] = useState("");
  const [question7, setQuestion7] = useState("");
  const [question8, setQuestion8] = useState("");
  const [question9, setQuestion9] = useState("");
  const [question10, setQuestion10] = useState("");
  const [question11, setQuestion11] = useState("");
  const [status, setStatus] = useState(null);

  const selfReview = useSelector(performanceSelector);

  const {
    question_1,
    question_2,
    question_3,
    question_4,
    question_5,
    question_6,
    question_7,
    question_8,
    question_9,
    question_10,
  } = question();

  useEffect(() => {
    dispatch(showPerformance(idRequest));
  }, [dispatch, idRequest]);

  useEffect(() => {
    if (!selfReview) return;
    const {
      goals_set_staff,
      achievement_staff,
      goals_with_company_staff,
      challenging_staff,
      least_enjoy_staff,
      contribute_staff,
      current_job_staff,
      improvement_staff,
      obstructing_staff,
      feedback_staff,
      description_staff,
      status,
    } = selfReview?.attributes;

    setQuestion1(goals_set_staff);
    setQuestion2(achievement_staff);
    setQuestion3(goals_with_company_staff);
    setQuestion4(challenging_staff);
    setQuestion8(least_enjoy_staff);
    setQuestion5(contribute_staff);
    setQuestion6(current_job_staff);
    setQuestion7(improvement_staff);
    setQuestion9(obstructing_staff);
    setQuestion10(feedback_staff);
    setQuestion11(description_staff);
    setStatus(status);
  }, [selfReview]);

  const handleSavePerformance = () => {
    const data = {
      id: selfReview.id,
      question1: question1,
      question2: question2,
      question3: question3,
      question4: question4,
      question5: question5,
      question6: question6,
      question7: question7,
      question8: question8,
      question9: question9,
      question10: question10,
      question11: question11,
    };
    dispatch(editSelfReview(data));
  };

  const handleSubmitPerformance = () => {
    const data = {
      id: selfReview.id,
      status: "self_reviewed",
      question1: question1,
      question2: question2,
      question3: question3,
      question4: question4,
      question5: question5,
      question6: question6,
      question7: question7,
      question8: question8,
      question9: question9,
      question10: question10,
      question11: question11,
    };
    dispatch(editSelfReview(data));
  };

  const setDefault = (item) => (item ? item : "");

  if (selfReview) {
    const {
      goals_set_boss,
      achievement_boss,
      goals_with_company_boss,
      challenging_boss,
      least_enjoy_boss,
      contribute_boss,
      current_job_boss,
      improvement_boss,
      obstructing_boss,
      feedback_boss,
      description_boss,
      status,
    } = selfReview?.attributes;
    return (
      <>
        <Row className="mb-4">
          <Col md={6}>
            <Form.Label className="fs-3 fw-bold">Employee</Form.Label>
          </Col>
          <Col md={6}>
            <Form.Label className="fs-3 fw-bold">Reviewer</Form.Label>
          </Col>
        </Row>

        <Row className="mb-4">
          <Form.Label>{question_1}</Form.Label>
          <Col md={6}>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                value={question1}
                onChange={(e) => setQuestion1(e.target.value)}
                disabled={status === "self_reviewed" ? true : false}
              />
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <Card.Body>
              <Form.Group className="row">
                <FloatingLabel controlId="floatingTextarea2">
                  <Form.Control
                    as="textarea"
                    placeholder="Enter here..."
                    style={{ height: "100px" }}
                    defaultValue={setDefault(goals_set_boss)}
                    disabled
                  />
                </FloatingLabel>
              </Form.Group>
            </Card.Body>
          </Col>
        </Row>

        <Row className="mb-4">
          <Form.Label>{question_2}</Form.Label>
          <Col md={6}>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                value={question2}
                onChange={(e) => setQuestion2(e.target.value)}
                disabled={status === "self_reviewed" ? true : false}
              />
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <Card.Body>
              <Form.Group className="row">
                <FloatingLabel controlId="floatingTextarea2">
                  <Form.Control
                    as="textarea"
                    placeholder="Enter here..."
                    style={{ height: "100px" }}
                    defaultValue={setDefault(achievement_boss)}
                    disabled
                  />
                </FloatingLabel>
              </Form.Group>
            </Card.Body>
          </Col>
        </Row>

        <Row className="mb-4">
          <Form.Label>{question_3}</Form.Label>
          <Col md={6}>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                value={question3}
                onChange={(e) => setQuestion3(e.target.value)}
                disabled={status === "self_reviewed" ? true : false}
              />
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <Card.Body>
              <Form.Group className="row">
                <FloatingLabel controlId="floatingTextarea2">
                  <Form.Control
                    as="textarea"
                    placeholder="Enter here..."
                    style={{ height: "100px" }}
                    defaultValue={setDefault(goals_with_company_boss)}
                    disabled
                  />
                </FloatingLabel>
              </Form.Group>
            </Card.Body>
          </Col>
        </Row>

        <Row className="mb-4">
          <Form.Label>{question_4}</Form.Label>
          <Col md={6}>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                value={question4}
                onChange={(e) => setQuestion4(e.target.value)}
                disabled={status === "self_reviewed" ? true : false}
              />
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <Card.Body>
              <Form.Group className="row">
                <FloatingLabel controlId="floatingTextarea2">
                  <Form.Control
                    as="textarea"
                    placeholder="Enter here..."
                    style={{ height: "100px" }}
                    defaultValue={setDefault(challenging_boss)}
                    disabled
                  />
                </FloatingLabel>
              </Form.Group>
            </Card.Body>
          </Col>
        </Row>

        <Row className="mb-4">
          <Form.Label>{question_5}</Form.Label>
          <Col md={6}>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                value={question5}
                onChange={(e) => setQuestion5(e.target.value)}
                disabled={status === "self_reviewed" ? true : false}
              />
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <Card.Body>
              <Form.Group className="row">
                <FloatingLabel controlId="floatingTextarea2">
                  <Form.Control
                    as="textarea"
                    placeholder="Enter here..."
                    style={{ height: "100px" }}
                    defaultValue={setDefault(least_enjoy_boss)}
                    disabled
                  />
                </FloatingLabel>
              </Form.Group>
            </Card.Body>
          </Col>
        </Row>

        <Row className="mb-4">
          <Form.Label>{question_6}</Form.Label>
          <Col md={6}>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                value={question6}
                onChange={(e) => setQuestion6(e.target.value)}
                disabled={status === "self_reviewed" ? true : false}
              />
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <Card.Body>
              <Form.Group className="row">
                <FloatingLabel controlId="floatingTextarea2">
                  <Form.Control
                    as="textarea"
                    placeholder="Enter here..."
                    style={{ height: "100px" }}
                    defaultValue={setDefault(contribute_boss)}
                    disabled
                  />
                </FloatingLabel>
              </Form.Group>
            </Card.Body>
          </Col>
        </Row>

        <Row className="mb-4">
          <Form.Label>{question_7}</Form.Label>
          <Col md={6}>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                value={question7}
                onChange={(e) => setQuestion7(e.target.value)}
                disabled={status === "self_reviewed" ? true : false}
              />
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <Card.Body>
              <Form.Group className="row">
                <FloatingLabel controlId="floatingTextarea2">
                  <Form.Control
                    as="textarea"
                    placeholder="Enter here..."
                    style={{ height: "100px" }}
                    defaultValue={setDefault(current_job_boss)}
                    disabled
                  />
                </FloatingLabel>
              </Form.Group>
            </Card.Body>
          </Col>
        </Row>

        <Row className="mb-4">
          <Form.Label>{question_8}</Form.Label>
          <Col md={6}>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                value={question8}
                onChange={(e) => setQuestion8(e.target.value)}
                disabled={status === "self_reviewed" ? true : false}
              />
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <Card.Body>
              <Form.Group className="row">
                <FloatingLabel controlId="floatingTextarea2">
                  <Form.Control
                    as="textarea"
                    placeholder="Enter here..."
                    style={{ height: "100px" }}
                    defaultValue={setDefault(improvement_boss)}
                    disabled
                  />
                </FloatingLabel>
              </Form.Group>
            </Card.Body>
          </Col>
        </Row>

        <Row className="mb-4">
          <Form.Label>{question_9}</Form.Label>
          <Col md={6}>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                value={question9}
                onChange={(e) => setQuestion9(e.target.value)}
                disabled={status === "self_reviewed" ? true : false}
              />
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <Card.Body>
              <Form.Group className="row">
                <FloatingLabel controlId="floatingTextarea2">
                  <Form.Control
                    as="textarea"
                    placeholder="Enter here..."
                    style={{ height: "100px" }}
                    defaultValue={setDefault(obstructing_boss)}
                    disabled
                  />
                </FloatingLabel>
              </Form.Group>
            </Card.Body>
          </Col>
        </Row>

        <Row className="mb-4">
          <Form.Label>{question_10}</Form.Label>
          <Col md={6}>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                value={question10}
                onChange={(e) => setQuestion10(e.target.value)}
                disabled={status === "self_reviewed" ? true : false}
              />
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <Card.Body>
              <Form.Group className="row">
                <FloatingLabel controlId="floatingTextarea2">
                  <Form.Control
                    as="textarea"
                    placeholder="Enter here..."
                    style={{ height: "100px" }}
                    defaultValue={setDefault(feedback_boss)}
                    disabled
                  />
                </FloatingLabel>
              </Form.Group>
            </Card.Body>
          </Col>
        </Row>

        <Row className="mb-4">
          <Form.Label>Others</Form.Label>
          <Col md={6}>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                value={question11}
                onChange={(e) => setQuestion11(e.target.value)}
                disabled={status === "self_reviewed" ? true : false}
              />
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <Card.Body>
              <Form.Group className="row">
                <FloatingLabel controlId="floatingTextarea2">
                  <Form.Control
                    as="textarea"
                    placeholder="Enter here..."
                    style={{ height: "100px" }}
                    defaultValue={setDefault(description_boss)}
                    disabled
                  />
                </FloatingLabel>
              </Form.Group>
            </Card.Body>
          </Col>
        </Row>

        {status === "in_progress" ? (
          <div className="text-end mt-3">
            <Button variant="info" onClick={handleSavePerformance}>
              Save
            </Button>
            <Button
              className="ms-5"
              variant="primary"
              onClick={handleSubmitPerformance}
            >
              Submit
            </Button>
          </div>
        ) : null}
      </>
    );
  } else {
    <EmptyData />;
  }
};

export default Performance;
