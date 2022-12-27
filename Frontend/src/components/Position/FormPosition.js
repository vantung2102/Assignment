import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  departmentsSelector,
  fetchDepartment,
} from "../../features/department/departmentSlice";
import {
  fetchPosition,
  newPosition,
  positionSelector,
} from "../../features/position/positionSlice";
import { SubmitSection } from "../Department/department";
import Select from "react-select";

const FormPosition = ({ isNew, show, close }) => {
  const dispatch = useDispatch();

  const departments = useSelector(departmentsSelector);
  const position = useSelector(positionSelector);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [departmentId, setDepartmentId] = useState(null);

  const departmentOptions = [];

  if (departments) {
    departments.map((item) => {
      departmentOptions.push({ value: item.id, label: item.attributes.name });
    });
  }

  useEffect(() => {
    dispatch(fetchDepartment());
  }, []);

  useEffect(() => {
    if (!isNew) {
      setName(position.attributes.name);
      setDescription(position.attributes.description);
      setDepartmentId(position.attributes.department_id);
    }
  }, [position]);

  const handleNewPosition = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      description: description,
      department_id: departmentId,
    };
    dispatch(newPosition(data));
    close(false);
    setName("");
    setDescription("");
    setDepartmentId(null);

    dispatch(fetchPosition());
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{isNew ? "Add position" : "Update position"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>
              Department Name <span className="text-danger">*</span>
            </Form.Label>
            <Select
              name="form-field-departments"
              options={departmentOptions}
              value={departmentId}
              placeholder="Select Departments"
              onChange={(e) => setDepartmentId(e.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Position Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Label>
            Description <span className="text-danger">*</span>
          </Form.Label>

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
            <Button className="submit-btn" onClick={handleNewPosition}>
              {isNew ? "Submit" : "Update"}
            </Button>
          </SubmitSection>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormPosition;
