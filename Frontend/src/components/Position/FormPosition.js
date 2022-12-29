import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  departmentsSelector,
  fetchDepartment,
} from "../../features/department/departmentSlice";
import {
  newPosition,
  positionSelector,
} from "../../features/position/positionSlice";
import { SubmitSection } from "../Department/department";
import Select from "react-select";
import { optionSelect2 } from "../../common/hooks/hooks";

const FormPosition = ({ isNew, show, close }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const departments = useSelector(departmentsSelector);
  const position = useSelector(positionSelector);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [departmentId, setDepartmentId] = useState(null);

  useEffect(() => {
    dispatch(fetchDepartment());
  }, []);

  useEffect(() => {
    if (!isNew) {
      setValue("name", position?.attributes.name);
      setValue("description", position?.attributes.name);
      setValue(
        "department",
        optionSelect2(departments, "name").filter(
          (item) => item.value == position?.attributes.department.id
        )[0]
      );
    }
  }, [position]);

  const handleNewPosition = () => {
    dispatch(
      newPosition({
        name: watch("name"),
        description: watch("description"),
        department_id: watch("department").value,
      })
    );
    close(false);
    setValue("name", "");
    setValue("description", "");
    setValue("department", "");
  };

  const handleEditPosition = () => {
    dispatch(
      newPosition({
        id: position.attributes.id,
        name: watch("name"),
        description: watch("description"),
        department_id: watch("department").value,
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
            <Form.Label>Department Name</Form.Label>

            <Controller
              control={control}
              name="department"
              rules={{ required: "Select Departments" }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  options={optionSelect2(departments, "name")}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={getValues("department")}
                  name={name}
                  ref={ref}
                  placeholder="Select Departments"
                />
              )}
            />

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.department?.message}
            </Form.Control.Feedback>
          </Form.Group>

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
