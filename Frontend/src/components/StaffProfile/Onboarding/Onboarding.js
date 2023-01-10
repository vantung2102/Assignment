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
} from "../../../features/onboarding/onboardingSlice";
import { Table } from "../../Staff/staff";
import FormOnboarding from "./FormOnboarding";

const Onboarding = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const onboarding = useSelector(onboardingStepsSelector);

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

  const handleDelete = (id) => {};

  return (
    <Row>
      <Col md={12}>
        <div className="table-responsive">
          <div className="table">
            <div className="table-content">
              <Table>
                <thead>
                  <tr>
                    <th className="ant-table-cell">STT</th>
                    <th className="ant-table-cell text-center">Task</th>
                    <th className="ant-table-cell text-center">Assign To</th>
                    <th className="ant-table-cell text-center">Start date</th>
                    <th className="ant-table-cell text-center">Due date</th>
                    <th className="ant-table-cell text-center">Status</th>
                    <th className="ant-table-cell text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {onboarding?.map((item, index) => (
                    <tr key={item.attributes.id} className="text-center">
                      <td className="ant-table-cell">{index + 1}</td>
                      <td className="ant-table-cell">
                        {item.attributes?.onboarding_sample_step?.task}
                      </td>
                      <td className="ant-table-cell">
                        {item.attributes?.assigned_person?.fullname}
                      </td>
                      <td className="ant-table-cell">
                        {item.attributes.start_date}
                      </td>
                      <td className="ant-table-cell">
                        {item.attributes.due_date}
                      </td>
                      <td className="ant-table-cell">
                        <Button
                          size="sm"
                          variant={
                            item.attributes.status === "outstanding"
                              ? "outline-danger"
                              : "outline-success"
                          }
                        >
                          {item.attributes.status}
                        </Button>
                      </td>
                      <td className="ant-table-cell">
                        <div className="d-flex justify-content-evenly">
                          <Form.Check.Input
                            type="checkbox"
                            isValid
                            checked={
                              item.attributes.status === "outstanding"
                                ? false
                                : true
                            }
                            disabled={
                              item.attributes.status === "outstanding"
                                ? false
                                : true
                            }
                            onChange={() => handleCompleted(item.attributes.id)}
                          />

                          {item.attributes.status === "outstanding" ? (
                            <>
                              <TbEdit
                                style={{
                                  fontSize: "20px",
                                }}
                                onClick={() => handleShow(item.attributes.id)}
                              />

                              <RiDeleteBinLine
                                style={{
                                  fontSize: "20px",
                                }}
                                onClick={() => handleDelete(item.attributes.id)}
                              />
                            </>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Col>

      <FormOnboarding show={show} close={handleClose} />
    </Row>
  );
};

export default Onboarding;
