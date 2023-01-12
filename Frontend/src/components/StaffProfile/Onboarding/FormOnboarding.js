import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { SubmitSection } from "../../Department/department";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaff, staffsSelector } from "../../../features/staff/staffSlice";
import { optionSelect2 } from "../../../common/hooks/hooks";
import {
  editOnboardingStep,
  onboardingStepSelector,
} from "../../../features/onboarding/onboardingSlice";

const FormOnboarding = ({ close, show }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const staffs = useSelector(staffsSelector);
  const onboardingStep = useSelector(onboardingStepSelector);

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  const compareDate = (start, end) => {
    const date1 = new Date(start).getTime();
    const date2 = new Date(end).getTime();
    return date2 >= date1 ? true : false;
  };

  const handleUpdateOnboardingStep = () => {
    dispatch(
      editOnboardingStep({
        id: onboardingStep.id,
        staff_id: watch("staff").value,
        start_date: watch("start_date"),
        due_date: watch("due_date"),
      })
    );

    close(false);
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Update Onboarding step</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(handleUpdateOnboardingStep)}>
          <Form.Group>
            <Form.Label>Start date</Form.Label>
            <Form.Control
              type="date"
              defaultValue={getValues("start_day")}
              {...register("start_date", {
                required: "Start date is required",
              })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.start_date?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Due day</Form.Label>
            <Form.Control
              type="date"
              defaultValue={getValues("end_day")}
              {...register("due_date", {
                required: "Due day is required",
                validate: (value) => {
                  return compareDate(watch("start_date"), value)
                    ? null
                    : "Due Day greater than or equal to Start day";
                },
              })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.due_date?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Assign to</Form.Label>

            <Controller
              control={control}
              name="staff"
              rules={{ required: "Select Staff" }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  options={optionSelect2(staffs, "fullname")}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={getValues("staff")}
                  name={name}
                  ref={ref}
                  placeholder="Select Staff"
                />
              )}
            />
          </Form.Group>

          <SubmitSection>
            <Button className="submit-btn" type="submit">
              Update
            </Button>
          </SubmitSection>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormOnboarding;
