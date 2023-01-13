import React from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { CreateAllPerformance } from "../../features/performance/performanceSlice";
import { SubmitSection } from "../Department/department";

const FormPerformance = ({ show, close }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

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

  const handleNewPerformance = () => {
    dispatch(
      CreateAllPerformance({
        start_date: watch("start_date"),
        end_date: watch("end_date"),
      })
    );
    close(true);
  };
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Add Performance</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(handleNewPerformance)}>
          <Form.Group>
            <Form.Label>Start day</Form.Label>
            <Form.Control
              type="date"
              defaultValue={getValues("start_date")}
              {...register("start_date", {
                required: "Start date is required",
              })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.start_date?.message}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.start_day?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>End day</Form.Label>
            <Form.Control
              type="date"
              defaultValue={getValues("end_date")}
              {...register("end_date", {
                required: "End date is required",
                validate: (value) => {
                  return compareDate(watch("start_date"), value)
                    ? null
                    : "End date greater than or equal to Start date";
                },
              })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.end_date?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <SubmitSection>
            <Button className="submit-btn" type="submit">
              Submit
            </Button>
          </SubmitSection>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormPerformance;
