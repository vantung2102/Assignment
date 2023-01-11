import React from "react";
import { Controller, useForm } from "react-hook-form";

const FormInactive = ({ show, close }) => {
  const {
    register,
    control,
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleInactive = () => {};

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Inactive Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(handleInactive)}>
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

export default FormInactive;
