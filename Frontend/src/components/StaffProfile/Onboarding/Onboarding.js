import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { AiFillInfoCircle } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { TiArrowUnsorted } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  staffOnboarding,
  staffOnboardingSelector,
} from "../../../features/onboarding/onboardingSlice";
import { Table } from "../../Staff/staff";
import staff from "../../Staff/staff.module.scss";

const Onboarding = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const onboarding = useSelector(staffOnboardingSelector);

  useEffect(() => {
    dispatch(staffOnboarding(id));
  }, []);

  const handleShowOnboardingStep = () => {};

  return (
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
                    <th className="ant-table-cell text-center">Create at</th>
                    <th className="ant-table-cell text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {onboarding?.map((item, index) => (
                    <tr key={item.attributes.id}>
                      <td className="ant-table-cell">{index}</td>
                      <td className="ant-table-cell">{item.position?.name}</td>
                      <td className="ant-table-cell">
                        {item.attributes.created_at}
                      </td>
                      <td className="ant-table-cell">
                        <div className="d-flex justify-content-evenly">
                          <AiFillInfoCircle
                            style={{
                              fontSize: "20px",
                            }}
                            // onClick={() =>
                            //   handleShowOnboardingStep(item.attributes.id)
                            // }
                          />

                          <TbEdit
                            style={{
                              fontSize: "20px",
                            }}
                            // onClick={() => handleShow(item.attributes.id)}
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
  );
};

export default Onboarding;
