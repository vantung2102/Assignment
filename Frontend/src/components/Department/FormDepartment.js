import React, { useEffect } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  departmentSelector,
  editDepartment,
  newDepartment,
} from "../../features/department/departmentSlice";
import { SubmitSection } from "./department";

const FormDepartment = ({ isNew, show, close }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const department = useSelector(departmentSelector);

  useEffect(() => {
    if (!isNew) {
      setValue("name", department?.attributes.name);
      setValue("description", department?.attributes.description);
    }
  }, [department]);

  const handleNewDepartment = () => {
    dispatch(
      newDepartment({
        name: watch("name"),
        description: watch("description"),
      })
    );
    close(true);
    setValue("name", "");
    setValue("description", "");
  };

  const handleEditDepartment = () => {
    dispatch(
      editDepartment({
        id: department?.attributes.id,
        name: watch("name"),
        description: watch("description"),
      })
    );
    close(true);
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isNew ? "Add Department" : "Update Department"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={handleSubmit(
            isNew ? handleNewDepartment : handleEditDepartment
          )}
        >
          <Form.Group>
            <Form.Label>Department Name</Form.Label>
            <Form.Control
              defaultValue={getValues("name")}
              {...register("name", { required: "Name is required" })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>

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
