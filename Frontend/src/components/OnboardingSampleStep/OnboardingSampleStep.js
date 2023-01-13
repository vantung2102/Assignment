import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { optionSelect2 } from "../../common/hooks/hooks";
import {
  destroyOnboarding,
  onboardingSample,
  onboardingSampleSelector,
  showOnboardingSample,
} from "../../features/onboarding/onboardingSlice";
import {
  allPositionSelector,
  fetchAllPosition,
} from "../../features/position/positionSlice";
import Select from "react-select";
import {
  TableCell,
  TableComponent,
  TableResponsive,
} from "../../global/jsx/common";
import TableHead from "../Table/TableHead";
import ActionColumn from "../Table/ActionColumn";
import FormOnboardingSampleStep from "./FormOnboardingSampleStep";

const OnboardingSampleStep = () => {
  const dispatch = useDispatch();
  const onboarding = useSelector(onboardingSampleSelector);
  const positions = useSelector(allPositionSelector);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(onboardingSample(null));
    dispatch(fetchAllPosition());
  }, [dispatch]);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    dispatch(showOnboardingSample(id));
    setShow(true);
  };

  const handleFilter = (val) => {
    dispatch(onboardingSample(val));
  };

  const handleDelete = (id) => {
    dispatch(destroyOnboarding(id));
  };

  return (
    <>
      {/* ============= Filter =============== */}
      <Row className="justify-content-end mb-4">
        <Col md={3} sm={6}>
          <Form.Group>
            <Select
              name="position"
              options={optionSelect2(positions, "name")}
              placeholder="Select Positions"
              onChange={(e) => handleFilter(e.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <TableResponsive>
            <TableComponent>
              <thead>
                <tr>
                  <TableHead title="STT" />
                  <TableHead title="Position" />
                  <TableHead title="Task" />
                  <TableHead title="Action" centerTitle={true} />
                </tr>
              </thead>
              <tbody>
                {onboarding?.map((item, index) => {
                  const { id, position, task } = item.attributes;
                  return (
                    <tr key={id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{position?.name}</TableCell>
                      <TableCell>{task}</TableCell>
                      <TableCell>
                        <ActionColumn
                          id={id}
                          edit={handleShow}
                          destroy={handleDelete}
                        />
                      </TableCell>
                    </tr>
                  );
                })}
              </tbody>
            </TableComponent>
          </TableResponsive>
        </Col>
        <FormOnboardingSampleStep
          isNew={false}
          show={show}
          close={handleClose}
        />
      </Row>
    </>
  );
};

export default OnboardingSampleStep;
