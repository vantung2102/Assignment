import React, { useEffect } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SubmitSection } from "../Department/department";
import Select from "react-select";
import { allPositionSelector } from "../../features/position/positionSlice";
import { optionSelect2 } from "../../common/hooks/hooks";
import {
  editOnboardingSample,
  newOnboardingSampleStep,
  onboardingSampleStepSelector,
} from "../../features/onboarding/onboardingSlice";

const FormOnboardingSampleStep = ({ isNew, show, close }) => {
  const dispatch = useDispatch();
  const positions = useSelector(allPositionSelector);
  const onboardingStep = useSelector(onboardingSampleStepSelector);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isNew || !onboardingStep) return;
    const { task, description, position } = onboardingStep.attributes;

    setValue("task", task);
    setValue("description", description);
    setValue("position", {
      value: position.id,
      label: position.name,
    });
  }, [onboardingStep, isNew, setValue]);

  const handleNewOnboarding = () => {
    dispatch(
      newOnboardingSampleStep({
        position_id: watch("position").value,
        task: watch("task"),
        description: watch("description"),
      })
    );

    close(false);
    setValue("task", "");
    setValue("description", "");
    setValue("position", "");
  };

  const handleEditOnboarding = () => {
    dispatch(
      editOnboardingSample({
        id: onboardingStep?.attributes.id,
        position_id: watch("position").value,
        task: watch("task"),
        description: watch("description"),
      })
    );

    close(false);
    setValue("task", "");
    setValue("description", "");
    setValue("description", "");
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isNew ? "Add Onboarding Task" : "Update Onboarding Task"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={handleSubmit(
            isNew ? handleNewOnboarding : handleEditOnboarding
          )}
        >
          <Form.Group>
            <Form.Label>Position</Form.Label>

            <Controller
              control={control}
              name="position"
              rules={{ required: "Select Position" }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  options={optionSelect2(positions, "name")}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={getValues("position")}
                  name={name}
                  ref={ref}
                  placeholder="Select Position"
                />
              )}
            />

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.position?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Task</Form.Label>
            <Form.Control
              defaultValue={getValues("task")}
              {...register("task", {
                required: "Task is required",
              })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.task?.message}
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

export default FormOnboardingSampleStep;
