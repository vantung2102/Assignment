import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  editPropertiesGroup,
  newPropertiesGroup,
  propertyGroupSelector,
} from "../../../features/propertyGroup/propertyGroupSlice";
import { SubmitSection } from "../../Department/department";

const FormPropertiesGroup = ({ isNew, show, close }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const propertyGroup = useSelector(propertyGroupSelector);

  useEffect(() => {
    if (!isNew) {
      setName(propertyGroup?.attributes.name);
      setDescription(propertyGroup?.attributes.description);
    }
  }, [propertyGroup, name]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleNewProperty = () => {
    const data = {
      name: watch("name"),
      description: watch("description"),
    };

    dispatch(newPropertiesGroup(data));
    close(true);
  };

  const handleEditProperty = () => {
    const data = {
      id: propertyGroup?.attributes.id,
      name: watch("name"),
      description: watch("description"),
    };

    dispatch(editPropertiesGroup(data));
    close(true);
  };

  console.log(name);

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isNew ? "Add Property Group" : "Update Property Group"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={handleSubmit(
            isNew ? handleNewProperty : handleEditProperty
          )}
        >
          <Form.Group>
            <Form.Label>
              Property Group Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              {...register("name", { required: "Name is required" })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Description <span className="text-danger">*</span>
            </Form.Label>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={description}
                {...register("description", {
                  required: "Description is required",
                })}
              />
            </FloatingLabel>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.description?.message}
            </Form.Control.Feedback>
          </Form.Group>
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

export default FormPropertiesGroup;
