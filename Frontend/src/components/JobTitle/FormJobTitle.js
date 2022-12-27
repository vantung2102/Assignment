import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobTitle,
  jobTitleSelector,
  newJobTitle,
} from "../../features/jobTitle/jobTitleSlice";
import { SubmitSection } from "../Department/department";

const FormJobTitle = ({ isNew, show, close }) => {
  const dispatch = useDispatch();

  const jobTitle = useSelector(jobTitleSelector);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!isNew) {
      setTitle(jobTitle.attributes.title);
      setDescription(jobTitle.attributes.description);
    }
  }, [jobTitle]);

  const handleNewPosition = () => {
    const data = {
      title: title,
      description: description,
    };
    console.log(data);

    dispatch(newJobTitle(data));
    close(true);
    setTitle("");
    setDescription("");
    dispatch(fetchJobTitle());
  };

  const handleEditPosition = () => {};

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{isNew ? "Add JobTitle" : "Update Job Title"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>
              JobTitle Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>

            <Form.Label>
              Description <span className="text-danger">*</span>
            </Form.Label>
          </Form.Group>
          <FloatingLabel controlId="floatingTextarea2">
            <Form.Control
              as="textarea"
              placeholder="Enter here..."
              style={{ height: "100px" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FloatingLabel>
          <SubmitSection>
            <Button
              className="submit-btn"
              onClick={isNew ? handleNewPosition : handleEditPosition}
            >
              {isNew ? "Submit" : "Update"}
            </Button>
          </SubmitSection>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormJobTitle;
