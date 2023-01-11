import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  completeOnboardingStep,
  fetchOnboardingStep,
  onboardingStepsSelector,
  showOnboardingStep,
  destroyOnboardingStep,
} from "../../../features/onboarding/onboardingSlice";
import { TableCell, TableComponent } from "../../../global/jsx/common";
import TableHead from "../../Table/TableHead";
import FormOnboarding from "./FormOnboarding";
import { Popconfirm } from "antd";

const Onboarding = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const onboarding = useSelector(onboardingStepsSelector);

  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(fetchOnboardingStep(id));
  }, [dispatch, id]);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    dispatch(showOnboardingStep(id));
    setShow(true);
  };
  const handleCompleted = (id) => {
    dispatch(completeOnboardingStep(id));
  };

  const handleDelete = (id) => {
    dispatch(destroyOnboardingStep(id));
  };

  return (
    <Row>
      <Col md={12}>
        <TableComponent>
          <thead>
            <tr>
              <TableHead title="STT" centerTitle={true} />
              <TableHead title="Task" centerTitle={true} />
              <TableHead title="Assign To" centerTitle={true} />
              <TableHead title="Start date" centerTitle={true} />
              <TableHead title="Due date" centerTitle={true} />
              <TableHead title="Status" centerTitle={true} />
              <TableHead title="Action" centerTitle={true} />
            </tr>
          </thead>
          <tbody>
            {onboarding?.map((item, index) => {
              const {
                id,
                onboarding_sample_step,
                assigned_person,
                start_date,
                due_date,
                status,
              } = item.attributes;
              return (
                <tr key={id} className="text-center">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{onboarding_sample_step?.task}</TableCell>
                  <TableCell>{assigned_person?.fullname}</TableCell>
                  <TableCell>{start_date}</TableCell>
                  <TableCell>{due_date}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant={
                        status === "outstanding"
                          ? "outline-danger"
                          : "outline-success"
                      }
                    >
                      {status}
                    </Button>
                  </TableCell>

                  <TableCell>
                    <div className="d-flex justify-content-evenly">
                      <Form.Check.Input
                        type="checkbox"
                        isValid
                        checked={status === "outstanding" ? false : true}
                        disabled={status === "outstanding" ? false : true}
                        onChange={() => handleCompleted(id)}
                      />

                      {status === "outstanding" ? (
                        <>
                          <TbEdit onClick={() => handleShow(id)} />
                          <Popconfirm
                            title="Are you sure?"
                            onConfirm={() => handleDelete(id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <RiDeleteBinLine />
                          </Popconfirm>
                        </>
                      ) : null}
                    </div>
                  </TableCell>
                </tr>
              );
            })}
          </tbody>
        </TableComponent>
      </Col>

      <FormOnboarding show={show} close={handleClose} />
    </Row>
  );
};

export default Onboarding;
