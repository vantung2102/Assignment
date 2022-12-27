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

const FormProperties = ({ isNew, show, close }) => {
  const dispatch = useDispatch();
  const property = useSelector(propertySelector);
  const propertiesGroup = useSelector(propertiesGroupSelector);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [groupProperty, setGroupProperty] = useState("");
  const [price, setPrice] = useState(0);
  const [buyDay, setBuyDay] = useState("");
  const [numberOfRepairs, setNumberOfRepairs] = useState(0);
  const [status, setStatus] = useState(false);

  const getOption = (arr, attr) => {
    return arr?.map((item) => {
      return { value: item.id, label: item.attributes[attr] };
    });
  };

  useEffect(() => {
    dispatch(fetchPropertiesGroup);
  }, []);

  useEffect(() => {
    if (!isNew) {
      setCode(property?.attributes.code_seri);
      setName(property?.attributes.name);
      setBrand(property?.attributes.brand);
      setGroupProperty(property?.attributes.group_property.id);
      setPrice(property?.attributes.price);
      setBuyDay(property?.attributes.date_buy);
      setNumberOfRepairs(property?.attributes.number_of_repairs);
      setStatus(property?.attributes.status);
    }
  }, [property]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleNewProperty = () => {
    const data = {
      name: watch("name"),
      description: watch("description"),
    };

    dispatch(newProperty(data));
    close(true);
  };

  const handleEditProperty = () => {
    const data = {
      id: property?.attributes.id,
      name: watch("name"),
      brand: watch("brand"),
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
            <Form.Label>
              Code <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              defaultValue={code}
              onChange={(e) => setCode(e.target.value)}
              {...register("code", { required: "Code is required" })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.code?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              {...register("name", { required: "Name is required" })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Brand <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              defaultValue={brand}
              onChange={(e) => setBrand(e.target.value)}
              {...register("brand", { required: "brand is required" })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.brand?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Price <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              defaultValue={price}
              onChange={(e) => setPrice(e.target.value)}
              {...register("price", { required: "price is required" })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.price?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Buy day <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="date"
              defaultValue={buyDay}
              onChange={(e) => setBuyDay(e.target.value)}
              {...register("buyDay", { required: "brand is required" })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.buyDay?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Number of repairs <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              defaultValue={numberOfRepairs}
              onChange={(e) => setNumberOfRepairs(e.target.value)}
              {...register("numberOfRepairs", {
                required: "brand is required",
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
                  options={getOption(propertiesGroup, "name")}
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
