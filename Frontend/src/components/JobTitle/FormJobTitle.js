import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  editJobTitle,
  jobTitleSelector,
  newJobTitle,
} from "../../features/jobTitle/jobTitleSlice";
import { SubmitSection } from "../Department/department";

const FormJobTitle = ({ isNew, show, close }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const jobTitle = useSelector(jobTitleSelector);
  useEffect(() => {
    if (!isNew) {
      setValue("name", jobTitle?.attributes.title);
      setValue("description", jobTitle?.attributes.description);
    }
  }, [jobTitle]);

  const handleNewPosition = () => {
    dispatch(
      newJobTitle({
        title: watch("name"),
        description: watch("description"),
      })
    );
    close(true);
  };

  const handleEditPosition = () => {
    dispatch(
      editJobTitle({
        id: jobTitle?.attributes.id,
        title: watch("name"),
        description: watch("description"),
      })
    );
    close(true);
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{isNew ? "Add JobTitle" : "Update Job Title"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={handleSubmit(
            isNew ? handleNewPosition : handleEditPosition
          )}
        >
          <Form.Group>
            <Form.Label>JobTitle Name</Form.Label>
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
                defaultValue={getValues("description")}
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
                {...register("description", {
                  required: "Description is required",
                })}
              ></Form.Control>

              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.description?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
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

export default FormJobTitle;
