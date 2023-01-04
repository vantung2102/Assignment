import React, { useEffect } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { optionSelect2 } from "../../common/hooks/hooks";
import { SubmitSection } from "../Department/department";
import Select from "react-select";
import { fetchStaff, staffsSelector } from "../../features/staff/staffSlice";
import { newLeave } from "../../features/leave/leaveSlice";

const FormLeave = ({ isNew, show, close }) => {
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

  useEffect(() => {
    dispatch(fetchStaff());
  }, []);

  const staffs = useSelector(staffsSelector);

  // useEffect(() => {
  //   if (!isNew) {
  //     setValue("name", position?.attributes.name);
  //     setValue("description", position?.attributes.name);
  //   }
  // }, [position]);

  const handleNewLeave = () => {
    dispatch(
      newLeave({
        staff_id: watch("name").value,
        casual_leave: watch("casualLeave"),
        unpaid_leave: watch("unpaidLeave"),
        marriage_leave: watch("marriageLeave"),
        compassionate_leave: watch("compassionateLeave"),
        paternity_leave: watch("paternityLeave"),
        maternity_leave: watch("maternityLeave"),
        allowed_number_of_days_off: watch("allowedNumber"),
        description: watch("description"),
      })
    );

    close(false);
    setValue("name", "");
    setValue("casualLeave", "");
    setValue("unpaidLeave", "");
    setValue("marriageLeave", "");
    setValue("compassionateLeave", "");
    setValue("paternityLeave", "");
    setValue("maternityLeave", "");
    setValue("allowedNumber", "");
    setValue("description", "");
  };

  const handleEditPosition = () => {
    dispatch();
    // newPosition({
    //   id: position.attributes.id,
    //   name: watch("name"),
    //   description: watch("description"),
    //   department_id: watch("department").value,
    // })
    close(true);
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{isNew ? "Add Leave" : "Update Leave"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(handleNewLeave)}>
          <Form.Group>
            <Form.Label>Staff</Form.Label>

            <Controller
              control={control}
              name="name"
              rules={{ required: "Select Departments" }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  options={optionSelect2(staffs, "fullname")}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={getValues("name")}
                  name={name}
                  ref={ref}
                  placeholder="Select Staff"
                />
              )}
            />

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Casual leave</Form.Label>
            <Form.Control
              type="number"
              defaultValue={getValues("casualLeave")}
              {...register("casualLeave", {
                required: "Casual Leave is required",
              })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.casualLeave?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Unpaid leave</Form.Label>
            <Form.Control
              type="number"
              defaultValue={getValues("unpaidLeave")}
              {...register("unpaidLeave", {
                required: "unpaid Leave is required",
              })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.unpaidLeave?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>marriage leave</Form.Label>
            <Form.Control
              type="number"
              defaultValue={getValues("marriageLeave")}
              {...register("marriageLeave", {
                required: "marriage Leave is required",
              })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.marriageLeave?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Compassionate leave</Form.Label>
            <Form.Control
              type="number"
              defaultValue={getValues("compassionateLeave")}
              {...register("compassionateLeave", {
                required: "Compassionate leave is required",
              })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.compassionateLeave?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Paternity leave</Form.Label>
            <Form.Control
              type="number"
              defaultValue={getValues("paternityLeave")}
              {...register("paternityLeave", {
                required: "Paternity leave is required",
              })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.paternityLeave?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Maternity leave</Form.Label>
            <Form.Control
              type="number"
              defaultValue={getValues("maternityLeave")}
              {...register("maternityLeave", {
                required: "Maternity leave is required",
              })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.maternityLeave?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Allowed number of days off</Form.Label>
            <Form.Control
              type="number"
              defaultValue={getValues("allowedNumber")}
              {...register("allowedNumber", {
                required: "Allowed number of days off is required",
              })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.allowedNumber?.message}
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

export default FormLeave;
