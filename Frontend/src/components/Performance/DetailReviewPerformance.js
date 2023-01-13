import React, { useEffect, useState } from "react";
import { Button, Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  editReviewForStaff,
  performanceSelector,
  showPerformance,
} from "../../features/performance/performanceSlice";
import question from "./question";

const DetailReviewPerformance = ({ idRequest }) => {
  const dispatch = useDispatch();
  const review = useSelector(performanceSelector);
  const [bossQuestion1, setBossQuestion1] = useState("");
  const [bossQuestion2, setBossQuestion2] = useState("");
  const [bossQuestion3, setBossQuestion3] = useState("");
  const [bossQuestion4, setBossQuestion4] = useState("");
  const [bossQuestion5, setBossQuestion5] = useState("");
  const [bossQuestion6, setBossQuestion6] = useState("");
  const [bossQuestion7, setBossQuestion7] = useState("");
  const [bossQuestion8, setBossQuestion8] = useState("");
  const [bossQuestion9, setBossQuestion9] = useState("");
  const [bossQuestion10, setBossQuestion10] = useState("");
  const [bossQuestion11, setBossQuestion11] = useState("");
  const [status, setStatus] = useState(null);

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
    if (!review) return;
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
    } = review.attributes;

    setBossQuestion1(goals_set_boss);
    setBossQuestion2(achievement_boss);
    setBossQuestion3(goals_with_company_boss);
    setBossQuestion4(challenging_boss);
    setBossQuestion8(least_enjoy_boss);
    setBossQuestion5(contribute_boss);
    setBossQuestion6(current_job_boss);
    setBossQuestion7(improvement_boss);
    setBossQuestion9(obstructing_boss);
    setBossQuestion10(feedback_boss);
    setBossQuestion11(description_boss);
    setStatus(status);
  }, [review]);

  const handleSavePerformance = () => {
    const data = {
      id: idRequest,
      question1: bossQuestion1,
      question2: bossQuestion2,
      question3: bossQuestion3,
      question4: bossQuestion4,
      question5: bossQuestion5,
      question6: bossQuestion6,
      question7: bossQuestion7,
      question8: bossQuestion8,
      question9: bossQuestion9,
      question10: bossQuestion10,
      question11: bossQuestion11,
    };
    dispatch(editReviewForStaff(data));
  };

  const handleSubmitPerformance = () => {
    const data = {
      id: idRequest,
      status: "completed",
      question1: bossQuestion1,
      question2: bossQuestion2,
      question3: bossQuestion3,
      question4: bossQuestion4,
      question5: bossQuestion5,
      question6: bossQuestion6,
      question7: bossQuestion7,
      question8: bossQuestion8,
      question9: bossQuestion9,
      question10: bossQuestion10,
      question11: bossQuestion11,
    };
    dispatch(editReviewForStaff(data));
  };

  if (review) {
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
    } = review.attributes;
    console.log(review);

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
                defaultValue={goals_set_staff}
                disabled
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
                    value={bossQuestion1}
                    onChange={(e) => setBossQuestion1(e.target.value)}
                    disabled={status === "completed" ? true : false}
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
                disabled
                defaultValue={achievement_staff}
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
                    value={bossQuestion2}
                    onChange={(e) => setBossQuestion2(e.target.value)}
                    disabled={status === "completed" ? true : false}
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
                disabled
                defaultValue={goals_with_company_staff}
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
                    value={bossQuestion3}
                    onChange={(e) => setBossQuestion3(e.target.value)}
                    disabled={status === "completed" ? true : false}
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
                disabled
                defaultValue={challenging_staff}
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
                    value={bossQuestion4}
                    onChange={(e) => setBossQuestion4(e.target.value)}
                    disabled={status === "completed" ? true : false}
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
                disabled
                defaultValue={least_enjoy_staff}
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
                    value={bossQuestion5}
                    onChange={(e) => setBossQuestion5(e.target.value)}
                    disabled={status === "completed" ? true : false}
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
                disabled
                defaultValue={contribute_staff}
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
                    value={bossQuestion6}
                    onChange={(e) => setBossQuestion6(e.target.value)}
                    disabled={status === "completed" ? true : false}
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
                disabled
                defaultValue={current_job_staff}
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
                    value={bossQuestion7}
                    onChange={(e) => setBossQuestion7(e.target.value)}
                    disabled={status === "completed" ? true : false}
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
                disabled
                defaultValue={improvement_staff}
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
                    value={bossQuestion8}
                    onChange={(e) => setBossQuestion8(e.target.value)}
                    disabled={status === "completed" ? true : false}
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
                disabled
                defaultValue={obstructing_staff}
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
                    value={bossQuestion9}
                    onChange={(e) => setBossQuestion9(e.target.value)}
                    disabled={status === "completed" ? true : false}
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
                disabled
                defaultValue={feedback_staff}
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
                    value={bossQuestion10}
                    onChange={(e) => setBossQuestion10(e.target.value)}
                    disabled={status === "completed" ? true : false}
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
                disabled
                defaultValue={description_staff}
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
                    value={bossQuestion11}
                    onChange={(e) => setBossQuestion11(e.target.value)}
                    disabled={status === "completed" ? true : false}
                  />
                </FloatingLabel>
              </Form.Group>
            </Card.Body>
          </Col>
        </Row>

        {status === "self_reviewed" ? (
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
    return "chua toi ky review";
  }
};

export default DetailReviewPerformance;
