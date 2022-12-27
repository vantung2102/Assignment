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

const FormStaff = ({ isNew, show, close }) => {
  const dispatch = useDispatch();
  const departments = useSelector(departmentsSelector);
  const positions = useSelector(positionsSelector);
  const jobTitles = useSelector(jobTitlesSelector);
  const managers = useSelector(staffsSelector);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [date, setDate] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setJobTitle] = useState("");
  const [jobTitle, setPosition] = useState("");
  const [active, setActive] = useState("");
  const [gender, setGender] = useState("");
  const [manager, setManager] = useState(null);

  const getOption = (arr, attr) => {
    return arr.map((item) => {
      return { value: item.id, label: item.attributes[attr] };
    });
  };

  const ActiveOptions = [
    { value: true, label: "Active" },
    { value: false, label: "Inactive" },
  ];

  const handleNewPosition = (e) => {
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
    dispatch(fetchStaff());
    close(false);
  };

  return (
    <Modal show={show} onHide={close} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>New Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(handleNewPosition)}>
          <Row>
            <Col sm={6}>
              <Form.Group>
                <Form.Label className="col-form-label">Full Name</Form.Label>
                <Form.Control
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
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
                  defaultValue={gmail}
                  onChange={(e) => setGmail(e.target.value)}
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
                  defaultValue={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
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
                  defaultValue={passwordConfirm}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
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
                <Form.Control
                  defaultValue={date}
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                />

                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.date?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group>
                <Form.Label className="col-form-label">gender</Form.Label>
                <Form.Control
                  defaultValue={gender}
                  onChange={(e) => setGender(e.target.value)}
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
                      options={getOption(departments, "name")}
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
                      options={getOption(positions, "name")}
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
                      options={getOption(jobTitles, "title")}
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
                      options={getOption(managers, "fullname")}
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
