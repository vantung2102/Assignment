import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  editProperty,
  newProperty,
  propertySelector,
} from "../../features/property/propertySlice";
import {
  fetchPropertiesGroup,
  propertiesGroupSelector,
} from "../../features/propertyGroup/propertyGroupSlice";
import { SubmitSection } from "../Department/department";
import Select from "react-select";
import { optionSelect2 } from "../../common/hooks/hooks";

const FormProperties = ({ isNew, show, close }) => {
  const dispatch = useDispatch();
  const property = useSelector(propertySelector);
  const propertiesGroup = useSelector(propertiesGroupSelector);
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchPropertiesGroup());
  }, [dispatch]);

  useEffect(() => {
    if (isNew || !property) return;

    const {
      code_seri,
      name,
      brand,
      group_property,
      price,
      date_buy,
      number_of_repairs,
    } = property;

    setValue("code", code_seri);
    setValue("name", name);
    setValue("brand", brand);
    setValue("propertyGroup", {
      value: group_property.id,
      label: group_property.name,
    });
    setValue("price", price);
    setValue("buyDay", date_buy);
    setValue("numberOfRepairs", number_of_repairs);
  }, [property]);

  const handleNewProperty = () => {
    const data = {
      code_seri: watch("code"),
      name: watch("name"),
      brand: watch("brand"),
      group_property_id: watch("propertyGroup").value,
      price: watch("price"),
      date_buy: watch("buyDay"),
      number_of_repairs: watch("numberOfRepairs"),
    };

    dispatch(newProperty(data));
    setValue("code", "");
    setValue("name", "");
    setValue("brand", "");
    setValue("propertyGroup", "");
    setValue("price", "");
    setValue("buyDay", "");
    setValue("numberOfRepairs", "");
    close(true);
  };

  const handleEditProperty = () => {
    const data = {
      id: property.id,
      code_seri: watch("code"),
      name: watch("name"),
      brand: watch("brand"),
      group_property_id: watch("propertyGroup").value,
      price: watch("price"),
      date_buy: watch("buyDay"),
      number_of_repairs: watch("numberOfRepairs"),
    };

    dispatch(editProperty(data));
    close(true);
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isNew ? "Add Property " : "Update Property "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={handleSubmit(
            isNew ? handleNewProperty : handleEditProperty
          )}
        >
          <Form.Group>
            <Form.Label>Code</Form.Label>
            <Form.Control
              defaultValue={getValues("code")}
              {...register("code", { required: "Code is required" })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.code?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              defaultValue={getValues("name")}
              {...register("name", { required: "Name is required" })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              defaultValue={getValues("brand")}
              {...register("brand", { required: "brand is required" })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.brand?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              defaultValue={getValues("price")}
              {...register("price", { required: "price is required" })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.price?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Buy day</Form.Label>
            <Form.Control
              type="date"
              defaultValue={getValues("buyDay")}
              {...register("buyDay", { required: "brand is required" })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.buyDay?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Number of repairs</Form.Label>
            <Form.Control
              defaultValue={getValues("numberOfRepairs")}
              {...register("numberOfRepairs", {
                required: "number Of Repairs is required",
              })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.numberOfRepairs?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label className="col-form-label">Property Group</Form.Label>
            <Controller
              control={control}
              name="propertyGroup"
              rules={{ required: "Property Group is required" }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  options={optionSelect2(propertiesGroup, "name")}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  name={name}
                  ref={ref}
                  placeholder="Select Property Group"
                />
              )}
            />

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.propertyGroup?.message}
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

export default FormProperties;
