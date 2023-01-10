import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartment } from "../../features/department/departmentSlice";
import {
  editPosition,
  newPosition,
  positionSelector,
} from "../../features/position/positionSlice";
import { SubmitSection } from "../Department/department";

const FormPosition = ({ isNew, show, close }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const position = useSelector(positionSelector);

  useEffect(() => {
    dispatch(fetchDepartment());
  }, [dispatch]);

  useEffect(() => {
    if (isNew || !position) return;
    const { name, description } = position?.attributes;
    setValue("name", name);
    setValue("description", description);
  }, [position, isNew, setValue]);

  const handleNewPosition = () => {
    dispatch(
      newPosition({
        name: watch("name"),
        description: watch("description"),
      })
    );
    close(false);
    setValue("name", "");
    setValue("description", "");
  };

  const handleEditPosition = () => {
    dispatch(
      editPosition({
        id: position.id,
        name: watch("name"),
        description: watch("description"),
      })
    );
    close(true);
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{isNew ? "Add position" : "Update position"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={handleSubmit(
            isNew ? handleNewPosition : handleEditPosition
          )}
        >
          <Form.Group>
            <Form.Label>Position Name</Form.Label>
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

export default FormPosition;
