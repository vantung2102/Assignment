import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { TiArrowUnsorted } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { optionSelect2 } from "../../common/hooks/hooks";
import {
  onboardingSample,
  onboardingSampleSelector,
} from "../../features/onboarding/onboardingSlice";
import {
  fetchPosition,
  positionsSelector,
} from "../../features/position/positionSlice";
import { Table } from "../Staff/staff";
import staff from "../Staff/staff.module.scss";
import Select from "react-select";

const OnboardingSampleStep = () => {
  const dispatch = useDispatch();
  const onboardingSampleSteps = useSelector(onboardingSampleSelector);
  const positions = useSelector(positionsSelector);

  useEffect(() => {
    dispatch(onboardingSample(null));
    dispatch(fetchPosition());
  }, []);

  const handleFilter = (val) => {
    dispatch(onboardingSample(val));
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
          <div className="table-responsive">
            <div className="table">
              <div className="table-content">
                <Table>
                  <thead>
                    <tr>
                      <th className="ant-table-cell">
                        <div className={staff.TableColumnSorters}>
                          <span className="table-column-title">STT</span>
                          <TiArrowUnsorted />
                        </div>
                      </th>
                      <th className="ant-table-cell">
                        <div className={staff.TableColumnSorters}>
                          <span className="table-column-title">Position</span>
                          <TiArrowUnsorted />
                        </div>
                      </th>
                      <th className="ant-table-cell">
                        <div className={staff.TableColumnSorters}>
                          <span className="table-column-title">Task</span>
                          <TiArrowUnsorted />
                        </div>
                      </th>

                      <th className="ant-table-cell text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {onboardingSampleSteps?.map((item, index) => (
                      <tr key={item.attributes.id}>
                        <td className="ant-table-cell">{index}</td>
                        <td className="ant-table-cell">
                          {item.attributes.position.name}
                        </td>
                        <td className="ant-table-cell">
                          {item.attributes.task}
                        </td>

                        <td className="ant-table-cell">
                          <div className="d-flex justify-content-evenly">
                            <TbEdit
                              style={{
                                fontSize: "20px",
                              }}
                              // onClick={() => handleShow(item.attributes.id)}
                            />
                            <RiDeleteBinLine
                              style={{
                                fontSize: "20px",
                              }}
                              // onClick={() =>
                              //   handleDeletePosition(item.attributes.id)
                              // }
                            />
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
      </Row>
    </>
  );
};

export default OnboardingSampleStep;
