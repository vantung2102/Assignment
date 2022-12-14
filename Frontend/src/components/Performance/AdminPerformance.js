import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateAllPerformance,
  fetchPerformance,
  performancesSelector,
  remindPerformance,
} from "../../features/performance/performanceSlice";
import { Table } from "../Staff/staff";
import FormPerformance from "./FormPerformance";
import staff from "../Staff/staff.module.scss";
import { TiArrowUnsorted } from "react-icons/ti";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";

const AdminPerformance = () => {
  const dispatch = useDispatch();
  const performances = useSelector(performancesSelector);
  console.log(performances);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
  };

  const handRemind = (id) => {
    dispatch(remindPerformance(id));
  };

  useEffect(() => {
    dispatch(fetchPerformance());
  }, []);

  if (performances?.length === 0) {
    return "chua toi ky danh gia";
  } else {
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
                        </div>
                      </th>
                      <th className="ant-table-cell">
                        <div className={staff.TableColumnSorters}>
                          <span className="table-column-title">Name</span>
                          <TiArrowUnsorted />
                        </div>
                      </th>
                      <th className="ant-table-cell">
                        <div className={staff.TableColumnSorters}>
                          <span className="table-column-title">Active</span>
                          <TiArrowUnsorted />
                        </div>
                      </th>
                      <th className="ant-table-cell">
                        <div className={staff.TableColumnSorters}>
                          <span className="table-column-title">Start day</span>
                          <TiArrowUnsorted />
                        </div>
                      </th>
                      <th className="ant-table-cell">
                        <div className={staff.TableColumnSorters}>
                          <span className="table-column-title">End day</span>
                          <TiArrowUnsorted />
                        </div>
                      </th>

                      <th className="ant-table-cell">
                        <div className={staff.TableColumnSorters}>
                          <span className="table-column-title">Status</span>
                          <TiArrowUnsorted />
                        </div>
                      </th>
                      <th className="ant-table-cell">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performances?.map((item, index) => (
                      <tr key={item.attributes.id} disabled>
                        <td className="ant-table-cell">{index + 1}</td>
                        <td className="ant-table-cell">
                          <Link to={item.id}>
                            {item.attributes?.staff?.fullname}
                          </Link>
                        </td>
                        <td className="ant-table-cell">
                          <Button
                            size="sm"
                            variant={
                              item.attributes.active
                                ? "outline-success"
                                : "outline-danger"
                            }
                          >
                            {item.attributes.active ? "Active" : "Inactive"}
                          </Button>
                        </td>
                        <td className="ant-table-cell">
                          {item.attributes.start_date}
                        </td>
                        <td className="ant-table-cell">
                          {item.attributes.end_date}
                        </td>

                        <td className="ant-table-cell">
                          <Button
                            size="sm"
                            variant={
                              item.attributes.status === "completed"
                                ? "outline-success"
                                : "outline-danger"
                            }
                          >
                            {item.attributes.status === "completed"
                              ? "completed"
                              : "in progress"}
                          </Button>
                        </td>
                        <td className="ant-table-cell text-center">
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => handRemind(item.id)}
                          >
                            Remind
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </Col>

        <FormPerformance close={handleClose} show={show} />
      </Row>
    );
  }
};

export default AdminPerformance;
