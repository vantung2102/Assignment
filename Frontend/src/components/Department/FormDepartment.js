import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  departmentSelector,
  editDepartment,
  fetchDepartment,
  newDepartment,
} from "../../features/department/departmentSlice";
import { SubmitSection } from "./department";

const FormDepartment = ({ isNew, show, close }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const department = useSelector(departmentSelector);

  useEffect(() => {
    if (!isNew) {
      setName(department.attributes.name);
      setDescription(department.attributes.description);
    }
  }, [department]);

  const handleNewDepartment = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      description: description,
    };

    dispatch(newDepartment(data));
    close(true);
    setName("");
    setDescription("");
    // dispatch(fetchDepartment());
  };

  const handleEditDepartment = (e) => {
    e.preventDefault();
    const data = {
      id: department.attributes.id,
      name: name,
      description: description,
    };

    dispatch(editDepartment(data));
    close(true);
    setName("");
    setDescription("");
    dispatch(fetchDepartment());
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isNew ? "Add Department" : "Update Department"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={isNew ? handleNewDepartment : handleEditDepartment}>
          <Form.Group>
            <Form.Label>
              Department Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <Button className="submit-btn" type="submit">
              {isNew ? "Submit" : "Update"}
            </Button>
          </SubmitSection>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormDepartment;
