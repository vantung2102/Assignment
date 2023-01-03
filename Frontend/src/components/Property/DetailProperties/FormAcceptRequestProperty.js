import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { optionSelect2 } from "../../../common/hooks/hooks";
import { SubmitSection } from "../../Department/department";
import Select from "react-select";
import { fetchStaff, staffsSelector } from "../../../features/staff/staffSlice";
import { useDispatch, useSelector } from "react-redux";
import { acceptProperty } from "../../../features/property/propertySlice";

const FormAcceptRequestProperty = ({ show, close, id }) => {
  const dispatch = useDispatch();
  const receivers = useSelector(staffsSelector);

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

  const handleAccept = () => {
    dispatch(acceptProperty({ id: id, receiver_id: watch("receiver").value }));
    close(true);
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title> Accept property request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(handleAccept)}>
          <Form.Group>
            <Form.Label>Receiver</Form.Label>
            <Controller
              control={control}
              name="receiver"
              rules={{ required: "Select Receiver" }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  options={optionSelect2(receivers, "fullname")}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  name={name}
                  ref={ref}
                  placeholder="Select Receiver"
                />
              )}
            />

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.receiver?.message}
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

export default FormAcceptRequestProperty;
