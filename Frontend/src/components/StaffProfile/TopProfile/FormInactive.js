import React, { useEffect } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { SubmitSection } from "../../Department/department";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  allStaffSelector,
  destroyAndUpdateStaffBoss,
  destroyStaff,
  fetchAllStaff,
  inActiveStaff,
  lowerLevelStaff,
  profileSelector,
} from "../../../features/staff/staffSlice";
import { optionSelect2 } from "../../../common/hooks/hooks";

const FormInactive = ({ show, close, idProfile }) => {
  const dispatch = useDispatch();
  const profile = useSelector(profileSelector);
  const managers = useSelector(allStaffSelector);

  const {
    control,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchAllStaff());
  }, [dispatch]);

  const handleInactiveNotLower = () => {
    dispatch(destroyStaff(idProfile));
    close(true);
  };

  const handleInactive = () => {
    dispatch(
      destroyAndUpdateStaffBoss({
        id: idProfile,
        boss_id: watch("manager").value,
      })
    );
    close(true);
  };
  console.log(profile);

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Inactive Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={handleSubmit(
            profile?.attributes.lower_levels.length > 0
              ? handleInactive
              : handleInactiveNotLower
          )}
        >
          {profile?.attributes.lower_levels.length > 0 ? (
            <Form.Group>
              <Form.Label>
                Manager
                <span className="text-danger">
                  (please select new manager for staff)
                </span>
              </Form.Label>

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
          ) : (
            <Form.Group>
              <Card.Title className="text-danger text-center fs-4">
                {" "}
                Are you sure?
              </Card.Title>
            </Form.Group>
          )}

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
