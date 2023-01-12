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
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const propertyGroup = useSelector(propertyGroupSelector);

  useEffect(() => {
    if (!isNew) {
      setValue("name", propertyGroup?.attributes.name);
      setValue("description", propertyGroup?.attributes.description);
    }
  }, [propertyGroup]);

  const handleNewProperty = () => {
    dispatch(
      newPropertiesGroup({
        name: watch("name"),
        description: watch("description"),
      })
    );
    close(true);
    setValue("name", "");
    setValue("description", "");
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
            <Form.Label>Property Group Name</Form.Label>
            <Form.Control
              defaultValue={getValues("name")}
              {...register("name", { required: "Name is required" })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
                defaultValue={getValues("description")}
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
