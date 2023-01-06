import React, { useEffect, useState } from "react";
import Select from "react-select";

import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { departmentsSelector } from "../../features/department/departmentSlice";
import { jobTitlesSelector } from "../../features/jobTitle/jobTitleSlice";
import { positionsSelector } from "../../features/position/positionSlice";
import {
  fetchStaff,
  newStaff,
  staffsSelector,
} from "../../features/staff/staffSlice";
import { SubmitSection } from "../Department/department";
import { Controller, useForm } from "react-hook-form";
import {
  emailValidator,
  passwordConfirmValidator,
  passwordValidator,
} from "../../validators/validators";
import { optionSelect2 } from "../../common/hooks/hooks";

const FormStaff = ({ isNew, show, close }) => {
  const dispatch = useDispatch();
  const departments = useSelector(departmentsSelector);
  const positions = useSelector(positionsSelector);
  const jobTitles = useSelector(jobTitlesSelector);
  const managers = useSelector(staffsSelector);

  const {
    register,
    control,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchStaff());
  }, []);

  const ActiveOptions = [
    { value: 0, label: "Active" },
    { value: 1, label: "Inactive" },
  ];

  const handleNewStaff = () => {
    const data = {
      fullname: watch("name"),
      email: watch("gmail"),
      password: watch("password"),
      department_id: watch("department").value,
      position_id: watch("position").value,
      job_title_id: watch("jobTitle").value,
      date_of_birth: watch("date"),
      gender: watch("gender"),
      status: watch("active").value,
      staff_id: watch("manager").value,
    };

    dispatch(newStaff(data));
    close(false);
  };

  return (
    <Modal show={show} onHide={close} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>New Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(handleNewStaff)}>
          <Row>
            <Col sm={6}>
              <Form.Group>
                <Form.Label className="col-form-label">Full Name</Form.Label>
                <Form.Control
                  defaultValue={getValues("name")}
                  {...register("name", { required: "Name is required" })}
                />

                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group>
                <Form.Label className="col-form-label">Email</Form.Label>
                <Form.Control
                  defaultValue={getValues("gmail")}
                  {...register("gmail", {
                    required: "Email Address is required",
                    pattern: {
                      value: emailValidator.pattern,
                      message: emailValidator.message,
                    },
                  })}
                />

                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.gmail?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group>
                <Form.Label className="col-form-label">Password</Form.Label>
                <Form.Control
                  type="password"
                  defaultValue={getValues("password")}
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: passwordValidator.pattern,
                      message: passwordValidator.message,
                    },
                  })}
                />

                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group>
                <Form.Label className="col-form-label">Password</Form.Label>
                <Form.Control
                  defaultValue={getValues("passwordConfirm")}
                  type="password"
                  {...register("passwordConfirm", {
                    required: "Password Confirm is required",
                    pattern: {
                      value: passwordConfirmValidator.pattern,
                      message: passwordConfirmValidator.message,
                    },
                    validate: (value) => {
                      if (watch("password") != value) {
                        return "Your passwords do no match";
                      }
                    },
                  })}
                />

                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.passwordConfirm?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group>
                <Form.Label className="col-form-label">
                  Date of Birth
                </Form.Label>
                <Form.Control defaultValue={getValues("date")} type="date" />

                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.date?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group>
                <Form.Label className="col-form-label">gender</Form.Label>
                <Form.Control
                  defaultValue={getValues("gender")}
                  {...register("gender", { required: "Gender is required" })}
                />

                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.gender?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group>
                <Form.Label className="col-form-label">Department</Form.Label>
                <Controller
                  control={control}
                  name="department"
                  rules={{ required: "Department is required" }}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Select
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      name={name}
                      ref={ref}
                      options={optionSelect2(departments, "name")}
                      placeholder="Select Department"
                    />
                  )}
                />

                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.department?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group>
                <Form.Label className="col-form-label">Position</Form.Label>
                <Controller
                  control={control}
                  name="position"
                  rules={{ required: "Position is required" }}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Select
                      options={optionSelect2(positions, "name")}
                      placeholder="Select Position"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      name={name}
                      ref={ref}
                    />
                  )}
                />

                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.position?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group>
                <Form.Label className="col-form-label">Job Title</Form.Label>
                <Controller
                  control={control}
                  name="jobTitle"
                  rules={{ required: "Job Title is required" }}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Select
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      name={name}
                      ref={ref}
                      options={optionSelect2(jobTitles, "title")}
                      placeholder="Select Tob Title"
                    />
                  )}
                />

                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.jobTitle?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group>
                <Form.Label className="col-form-label">Manager</Form.Label>
                <Controller
                  control={control}
                  name="manager"
                  rules={{ required: "Manager is required" }}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Select
                      options={optionSelect2(managers, "fullname")}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      name={name}
                      ref={ref}
                      placeholder="Select Tob Manager"
                    />
                  )}
                />

                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.manager?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group>
                <Form.Label className="col-form-label">Active</Form.Label>
                <Controller
                  control={control}
                  name="active"
                  rules={{ required: "Active is required" }}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Select
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      name={name}
                      ref={ref}
                      options={ActiveOptions}
                      placeholder="Select Active"
                    />
                  )}
                />

                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.active?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

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

export default FormStaff;
