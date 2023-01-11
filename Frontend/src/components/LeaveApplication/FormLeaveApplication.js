import React, { useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SubmitSection } from "../Department/department";
import Select from "react-select";
import { newLeaveApplication } from "../../features/leaveApplication/leaveApplicationSlice";
import {
  leaveByUser,
  leaveCurrentUserSelector,
} from "../../features/leave/leaveSlice";
import { getUserSelector } from "../../features/auth/authSlice";

const FormLeaveApplication = ({ isNew, close, show }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const currentUser = useSelector(getUserSelector);
  const leaveCurrentUser = useSelector(leaveCurrentUserSelector);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const handleNewLeaveApplication = () => {
    dispatch(
      newLeaveApplication({
        leave_type: watch("leave_type").value,
        start_day: watch("start_day"),
        end_day: watch("end_day"),
        number_of_days_off: watch("number_of_days_off"),
        description: watch("reason"),
      })
    );

    close(false);
    setValue("leave_type", "");
    setValue("start_day", "");
    setValue("end_day", "");
    setValue("number_of_days_off", 0);
    setValue("reason", "");
  };

  const option = () => {
    return [
      {
        value: 0,
        label: "casual leave",
      },
      {
        value: 1,
        label: "unpaid leave",
      },
      {
        value: 2,
        label: "marriage leave",
      },
      {
        value: 3,
        label: "compassionate leave",
      },
      {
        value: 4,
        label: "paternity leave",
      },
      {
        value: 5,
        label: "maternity leave",
      },
    ];
  };

  const compareDate = (start, end) => {
    const date1 = new Date(start).getTime();
    const date2 = new Date(end).getTime();
    return date2 >= date1 ? true : false;
  };

  const compareNumberOfDay = (start, end, numberOfDay) => {
    const date1 = new Date(start).getTime();
    const date2 = new Date(end).getTime();

    const number = (date2 - date1) / 3600000 / 24;

    return (number + 1).toString() === numberOfDay ||
      (number + 0.5).toString() === numberOfDay
      ? true
      : false;
  };

  const handMessage = (number) => {
    setMessage(`You have ${number} days remaining`);
  };

  const handleSelectType = (e) => {
    dispatch(leaveByUser(currentUser.id));
    setValue("leave_type", e);

    switch (watch("leave_type").value) {
      case 0:
        handMessage(12 - leaveCurrentUser?.attributes.casual_leave);
        break;
      case 1:
        setMessage(
          `You took ${leaveCurrentUser?.attributes.unpaid_leave} days off work`
        );
        break;
      case 2:
        handMessage(3 - leaveCurrentUser?.attributes.marriage_leave);
        break;
      case 3:
        handMessage(3 - leaveCurrentUser?.attributes.compassionate_leave);
        break;
      case 4:
        handMessage(1 - leaveCurrentUser?.attributes.paternity_leave);
        break;
      case 5:
        handMessage(30 * 6 - leaveCurrentUser?.attributes.maternity_leave);
        break;
      default:
        setMessage("");
        break;
    }
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{isNew ? "Add Leave" : "Update Leave"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(handleNewLeaveApplication)}>
          <Form.Group>
            <Form.Label>Leave type</Form.Label>

            <Controller
              control={control}
              name="leave_type"
              rules={{ required: "Select Departments" }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  options={option()}
                  onChange={(e) => handleSelectType(e)}
                  onBlur={onBlur}
                  value={getValues("leave_type")}
                  name={name}
                  ref={ref}
                  placeholder="Select leave type"
                />
              )}
            />

            <Form.Text className="text-info">{message}</Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Start day</Form.Label>
            <Form.Control
              type="date"
              defaultValue={getValues("start_day")}
              {...register("start_day", {
                required: "Start day is required",
              })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.start_day?.message}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.start_day?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>End day</Form.Label>
            <Form.Control
              type="date"
              defaultValue={getValues("end_day")}
              {...register("end_day", {
                required: "End day is required",
                validate: (value) => {
                  return compareDate(watch("start_day"), value)
                    ? null
                    : "End Day greater than or equal to Start day";
                },
              })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.end_day?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Number of days</Form.Label>
            <Form.Control
              type="number"
              step="0.5"
              onKeyDown={(e) => {
                e.preventDefault();
              }}
              defaultValue={getValues("number_of_days_off")}
              {...register("number_of_days_off", {
                required: "number of days off is required",
                validate: (value) => {
                  return compareNumberOfDay(
                    watch("start_day"),
                    watch("end_day"),
                    value
                  )
                    ? null
                    : "Number of date invalid";
                },
              })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.number_of_days_off?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Reason</Form.Label>

            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                defaultValue={getValues("reason")}
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
                {...register("reason", {
                  required: "Reason is required",
                })}
              ></Form.Control>

              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.reason?.message}
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

export default FormLeaveApplication;
