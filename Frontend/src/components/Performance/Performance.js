import React, { useEffect, useState } from "react";
import { Button, Card, Col, FloatingLabel, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  editReviewForStaff,
  editSelfReview,
  performanceSelector,
  selfReviewPerformanceSelector,
  showPerformance,
  showSelfReview,
} from "../../features/performance/performanceSlice";
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
  }, []);

  useEffect(() => {
    if (selfReview != null) {
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
      } = selfReview?.attributes;

      if (goals_set_staff) setQuestion1(goals_set_staff);
      if (achievement_staff) setQuestion2(achievement_staff);
      if (goals_with_company_staff) setQuestion3(goals_with_company_staff);
      if (challenging_staff) setQuestion4(challenging_staff);
      if (least_enjoy_staff) setQuestion8(least_enjoy_staff);
      if (contribute_staff) setQuestion5(contribute_staff);
      if (current_job_staff) setQuestion6(current_job_staff);
      if (improvement_staff) setQuestion7(improvement_staff);
      if (obstructing_staff) setQuestion9(obstructing_staff);
      if (feedback_staff) setQuestion10(feedback_staff);
      if (description_staff) setQuestion11(description_staff);
    }
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

  const disabledSelfReview = (selfReview) => {
    return selfReview?.attributes.status === "self_reviewed" ? true : false;
  };

  return (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>{question_1}</Form.Label>

            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
                value={question1}
                onChange={(e) => setQuestion1(e.target.value)}
                disabled={
                  selfReview?.attributes.status === "self_reviewed"
                    ? true
                    : false
                }
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{question_2}</Form.Label>

            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
                value={question2}
                onChange={(e) => setQuestion2(e.target.value)}
                disabled={
                  selfReview?.attributes.status === "self_reviewed"
                    ? true
                    : false
                }
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{question_3}</Form.Label>

            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
                value={question3}
                onChange={(e) => setQuestion3(e.target.value)}
                disabled={
                  selfReview?.attributes.status === "self_reviewed"
                    ? true
                    : false
                }
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{question_4}</Form.Label>

            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
                value={question4}
                onChange={(e) => setQuestion4(e.target.value)}
                disabled={
                  selfReview?.attributes.status === "self_reviewed"
                    ? true
                    : false
                }
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{question_5}</Form.Label>

            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
                value={question5}
                onChange={(e) => setQuestion5(e.target.value)}
                disabled={
                  selfReview?.attributes.status === "self_reviewed"
                    ? true
                    : false
                }
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{question_6}</Form.Label>

            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
                value={question6}
                onChange={(e) => setQuestion6(e.target.value)}
                disabled={
                  selfReview?.attributes.status === "self_reviewed"
                    ? true
                    : false
                }
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <Col lg={12} className="col-form-label">
              <Form.Label>{question_7}</Form.Label>
            </Col>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
                value={question7}
                onChange={(e) => setQuestion7(e.target.value)}
                disabled={
                  selfReview?.attributes.status === "self_reviewed"
                    ? true
                    : false
                }
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <Col lg={12} className="col-form-label">
              <Form.Label>{question_8}</Form.Label>
            </Col>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
                value={question8}
                onChange={(e) => setQuestion8(e.target.value)}
                disabled={
                  selfReview?.attributes.status === "self_reviewed"
                    ? true
                    : false
                }
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{question_9}</Form.Label>

            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
                value={question9}
                onChange={(e) => setQuestion9(e.target.value)}
                disabled={
                  selfReview?.attributes.status === "self_reviewed"
                    ? true
                    : false
                }
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{question_10}</Form.Label>

            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
                value={question10}
                onChange={(e) => setQuestion10(e.target.value)}
                disabled={
                  selfReview?.attributes.status === "self_reviewed"
                    ? true
                    : false
                }
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Others</Form.Label>

            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
                value={question11}
                onChange={(e) => setQuestion11(e.target.value)}
                disabled={
                  selfReview?.attributes.status === "self_reviewed"
                    ? true
                    : false
                }
              />
            </FloatingLabel>
          </Form.Group>

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
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Performance;
