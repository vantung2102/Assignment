import React, { useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  editRequestProperty,
  newRequestProperty,
} from "../../features/requestProperty/requestPropertySlice";
import { SubmitSection } from "../Department/department";

const FormRequestProperty = ({ isNew, show, close }) => {
  const dispatch = useDispatch();
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleNewProperty = () => {
    const data = {
      reason: watch("reason"),
      description: watch("description"),
    };

    dispatch(newRequestProperty(data));
    close(true);
  };

  const handleEditProperty = () => {
    const data = {
      // id: propertyGroup?.attributes.id,
      reason: watch("reason"),
      description: watch("description"),
    };

    dispatch(editRequestProperty(data));
    close(true);
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{isNew ? "Add Request" : "Update Request"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={handleSubmit(
            isNew ? handleNewProperty : handleEditProperty
          )}
        >
          <Form.Group>
            <Form.Label>
              Reason <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              defaultValue={reason}
              onChange={(e) => setReason(e.target.value)}
              {...register("reason", { required: "Reason is required" })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.reason?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Description <span className="text-danger">*</span>
            </Form.Label>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={description}
                {...register("description", {
                  required: "Description is required",
                })}
              />
            </FloatingLabel>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.description?.message}
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

export default FormRequestProperty;
