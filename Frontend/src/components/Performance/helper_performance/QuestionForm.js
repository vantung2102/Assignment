import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";

const QuestionForm = ({ question, value, setQuestion, disabled }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{question}</Form.Label>

      <FloatingLabel controlId="floatingTextarea2">
        <Form.Control
          as="textarea"
          placeholder="Enter here..."
          style={{ height: "100px" }}
          value={value}
          onChange={setQuestion}
          disabled={disabled}
        />
      </FloatingLabel>
    </Form.Group>
  );
};

export default QuestionForm;
