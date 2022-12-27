import React from "react";
import { Button, Card, Col, FloatingLabel, Form } from "react-bootstrap";

const Performance = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title> Performance Form</Card.Title>
        <Form>
          <Form.Group className="row">
            <Col lg={12} className="col-form-label">
              1. How did you do on the goals set for you during your last
              performance appraisal?
            </Col>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="row">
            <Col lg={12} className="col-form-label">
              2. What was your biggest achievement this year?
            </Col>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="row">
            <Col lg={12} className="col-form-label">
              3. What are your short-and long-term goals with the company, and
              for your career?
            </Col>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="row">
            <Col lg={12} className="col-form-label">
              4. What has been the most challenging aspect of your work this
              past year and why?
            </Col>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="row">
            <Col lg={12} className="col-form-label">
              5. Which parts of your job do you most / least enjoy?
            </Col>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="row">
            <Col lg={12} className="col-form-label">
              6. In what ways might you contribute more to the company?
            </Col>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="row">
            <Col lg={12} className="col-form-label">
              7. Do you feel that your current job and responsibilities are
              aligned with your future goals?
            </Col>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="row">
            <Col lg={12} className="col-form-label">
              8. Are you happy with the company’s culture? Do you feel that
              there is any scope for improvement?
            </Col>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="row">
            <Col lg={12} className="col-form-label">
              9. Is there anyone or anything that is obstructing your
              performance in this company?
            </Col>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="row">
            <Col lg={12} className="col-form-label">
              10. Do you feel that you receive adequate feedback? How frequent
              feedback do you prefer
            </Col>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="row">
            <Col lg={12} className="col-form-label">
              Others
            </Col>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          </Form.Group>

          <div className="text-end mt-3">
            <Button type="submit" className="btn-info">
              Save
            </Button>
            <Button type="submit" className="btn-primary ms-5">
              Submit
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Performance;
