import React, { useEffect } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProperties,
  propertiesSelector,
} from "../../../features/property/propertySlice";
import { fetchStaff, staffsSelector } from "../../../features/staff/staffSlice";
import Select from "react-select";
import { newPropertyProvidingHistory } from "../../../features/propertyProvidingHistories/propertyProvidingHistoriesSlice";
import { SubmitSection } from "../../Department/department";
import { optionSelect2 } from "../../../common/hooks/hooks";

const FormPropertyProvidingHistories = ({ isNew, show, close }) => {
  const dispatch = useDispatch();
  const properties = useSelector(propertiesSelector);
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
    dispatch(fetchProperties());
  }, []);

  const handleNewPropertyProvidingHistory = () => {
    dispatch(
      newPropertyProvidingHistory({
        receiver_id: watch("receiver").value,
        property_id: watch("property").value,
      })
    );
    close(true);
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{isNew ? "Add History" : "Update History"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(handleNewPropertyProvidingHistory)}>
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

          <Form.Group>
            <Form.Label>Property</Form.Label>
            <Controller
              control={control}
              name="property"
              rules={{
                required: "Select Property",
                validate: (value) => {
                  const property = properties.find(
                    (item) => item.id === value.value
                  );
                  return property.attributes.status === "used"
                    ? "The Property has been used"
                    : null;
                },
              }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  options={optionSelect2(properties, "name")}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  name={name}
                  ref={ref}
                  placeholder="Select Property"
                />
              )}
            />

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.property?.message}
            </Form.Control.Feedback>
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

export default FormPropertyProvidingHistories;
