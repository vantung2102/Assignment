import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { optionSelect2 } from "../../common/hooks/hooks";
import {
  destroyOnboarding,
  metaOnboardingSelector,
  onboardingSample,
  onboardingSampleSelector,
  sortOnboardingAsc,
  sortOnboardingDesc,
} from "../../features/onboarding/onboardingSlice";
import {
  allPositionSelector,
  fetchAllPosition,
  fetchPosition,
  positionsSelector,
} from "../../features/position/positionSlice";
import Select from "react-select";
import { TableCell, TableComponent } from "../../global/jsx/common";
import TableHead from "../Table/TableHead";
import ActionColumn from "../Table/ActionColumn";
import Paginate from "../Paginate/Paginate";
import FormOnboardingSampleStep from "./FormOnboardingSampleStep";

const OnboardingSampleStep = () => {
  const dispatch = useDispatch();
  const onboarding = useSelector(onboardingSampleSelector);
  const positions = useSelector(allPositionSelector);
  const meta = useSelector(metaOnboardingSelector);
  console.log(onboarding);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [show, setShow] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    dispatch(onboardingSample({ id: null, number: null }));
    dispatch(fetchAllPosition());
  }, [dispatch]);

  useEffect(() => {
    if (!meta) return;
    setItemsCount(meta.total_count);
    setItemsPerPage(meta.page_size);
  }, [meta]);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    // dispatch(showDepartment(id));
    setShow(true);
  };

  const handleFilter = (val) => {
    dispatch(onboardingSample({ id: null, number: val }));
  };

  const handleDelete = (id) => {
    dispatch(destroyOnboarding(id));
  };

  const handleSortAsc = () => {
    dispatch(sortOnboardingAsc());
    setToggle(!toggle);
  };

  const handleSortDesc = () => {
    dispatch(sortOnboardingDesc());
    setToggle(!toggle);
  };

  const getCurrentPage = (number) => {
    dispatch(onboardingSample({ id: null, number: number }));
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
          <TableComponent>
            <thead>
              <tr>
                <TableHead title="STT" />
                <TableHead title="Position" />
                <TableHead
                  title="Task"
                  isSort={true}
                  toggle={toggle}
                  desc={handleSortDesc}
                  asc={handleSortAsc}
                />
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
        </Col>
        <FormOnboardingSampleStep
          isNew={false}
          show={show}
          close={handleClose}
        />
      </Row>

      {meta && (
        <Paginate
          itemsCount={itemsCount}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          alwaysShown={false}
          getCurrentPage={getCurrentPage}
        />
      )}
    </>
  );
};

export default OnboardingSampleStep;
