import React, { useEffect } from "react";
import Select from "react-select";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { allDepartmentSelector } from "../../features/department/departmentSlice";
import { allJobTitleSelector } from "../../features/jobTitle/jobTitleSlice";
import { allPositionSelector } from "../../features/position/positionSlice";
import {
  allStaffSelector,
  editStaff,
  newStaff,
  profileSelector,
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

  const departments = useSelector(allDepartmentSelector);
  const positions = useSelector(allPositionSelector);
  const jobTitles = useSelector(allJobTitleSelector);
  const managers = useSelector(allStaffSelector);
  const profile = useSelector(profileSelector);

  const {
    register,
    control,
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isNew || !profile) return;

    const {
      fullname,
      email,
      department,
      position,
      job_title,
      date_of_birth,
      gender,
      status,
      upper_level,
      phone,
      address,
      join_date,
    } = profile?.attributes;

    setValue("name", fullname);
    setValue("gmail", email);
    setValue("department", { value: department?.id, label: department?.name });
    setValue("position", { value: position.id, label: position.name });
    setValue("jobTitle", { value: job_title.id, label: job_title.title });
    setValue("date", date_of_birth);
    setValue("phone", phone);
    setValue("address", address);
    setValue("join_date", join_date);
    setValue("gender", gender);
    setValue("manager", {
      value: upper_level?.id,
      label: upper_level?.fullname,
    });
    setValue("active", status);
  }, [profile, isNew, setValue]);

  const handleNewStaff = () => {
    const data = {
      fullname: watch("name"),
      email: watch("gmail"),
      phone: watch("phone"),
      password: watch("password"),
      department_id: watch("department").value,
      position_id: watch("position").value,
      job_title_id: watch("jobTitle").value,
      date_of_birth: watch("date"),
      join_date: watch("join_date"),
      gender: watch("gender"),
      address: watch("address"),
      staff_id: watch("manager").value,
    };

    dispatch(newStaff(data));
    close(false);
  };

  const handleEditStaff = () => {
    const data = {
      id: profile.id,
      fullname: watch("name"),
      email: watch("gmail"),
      department_id: watch("department").value,
      position_id: watch("position").value,
      job_title_id: watch("jobTitle").value,
      date_of_birth: watch("date"),
      gender: watch("gender"),
      join_date: watch("join_date"),
      address: watch("address"),
      staff_id: watch("manager").value,
      phone: watch("phone"),
    };

    dispatch(editStaff(data));
    close(false);
  };

  return (
    <Modal show={show} onHide={close} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{isNew ? "New Employee" : "Update Employee"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(isNew ? handleNewStaff : handleEditStaff)}>
          <Row>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
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
                <Form.Label>Email</Form.Label>
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

            {isNew ? (
              <>
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
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
                    <Form.Label>Confirm Password</Form.Label>
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
                          if (watch("password") !== value) {
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
              </>
            ) : null}

            <Col sm={6}>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  defaultValue={getValues("phone")}
                  {...register("phone", { required: "Phone is required" })}
                />

                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.phone?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  defaultValue={getValues("date")}
                  type="date"
                  {...register("date", {
                    required: "Date of Birth is required",
                  })}
                />

                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.date?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group>
                <Form.Label>Join date</Form.Label>
                <Form.Control
                  type="date"
                  defaultValue={getValues("join_date")}
                  {...register("join_date", {
                    required: "Join date is required",
                  })}
                />

                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.join_date?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group>
                <Form.Label>gender</Form.Label>
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
                <Form.Label>Department</Form.Label>
                <Controller
                  control={control}
                  name="department"
                  rules={{ required: "Department is required" }}
                  render={({ field: { onChange, onBlur, name, ref } }) => (
                    <Select
                      onChange={onChange}
                      onBlur={onBlur}
                      value={getValues("department")}
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
                <Form.Label>Position</Form.Label>
                <Controller
                  control={control}
                  name="position"
                  rules={{ required: "Position is required" }}
                  render={({ field: { onChange, onBlur, name, ref } }) => (
                    <Select
                      options={optionSelect2(positions, "name")}
                      placeholder="Select Position"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={getValues("position")}
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
                <Form.Label>Job Title</Form.Label>
                <Controller
                  control={control}
                  name="jobTitle"
                  rules={{ required: "Job Title is required" }}
                  render={({ field: { onChange, onBlur, name, ref } }) => (
                    <Select
                      onChange={onChange}
                      onBlur={onBlur}
                      value={getValues("jobTitle")}
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
                <Form.Label>Manager</Form.Label>
                <Controller
                  control={control}
                  name="manager"
                  rules={{ required: "Manager is required" }}
                  render={({ field: { onChange, onBlur, name, ref } }) => (
                    <Select
                      options={optionSelect2(managers, "fullname")}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={getValues("manager")}
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

            <Col sm={12}>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <FloatingLabel controlId="floatingTextarea2">
                  <Form.Control
                    defaultValue={getValues("address")}
                    as="textarea"
                    placeholder="Enter here..."
                    style={{ height: "100px" }}
                    {...register("address", {
                      required: "Address is required",
                    })}
                  ></Form.Control>

                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors.address?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>
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
