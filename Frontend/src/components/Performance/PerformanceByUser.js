import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchPerformanceByUser,
  selfReviewsPerformanceSelector,
} from "../../features/performance/performanceSlice";
import { Table } from "../Staff/staff";
import staff from "../Staff/staff.module.scss";

const PerformanceByUser = () => {
  const dispatch = useDispatch();
  const selfReview = useSelector(selfReviewsPerformanceSelector);
  useEffect(() => {
    dispatch(fetchPerformanceByUser());
  }, [dispatch]);
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
                      </div>
                    </th>
                    <th className="ant-table-cell">
                      <div className={staff.TableColumnSorters}>
                        <span className="table-column-title">Active</span>
                      </div>
                    </th>
                    <th className="ant-table-cell">
                      <div className={staff.TableColumnSorters}>
                        <span className="table-column-title">Start day</span>
                      </div>
                    </th>
                    <th className="ant-table-cell">
                      <div className={staff.TableColumnSorters}>
                        <span className="table-column-title">End day</span>
                      </div>
                    </th>

                    <th className="ant-table-cell">
                      <div className={staff.TableColumnSorters}>
                        <span className="table-column-title">Status</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selfReview?.map((item, index) => (
                    <tr key={item.attributes.id} disabled>
                      <td className="ant-table-cell">{index + 1}</td>
                      <td className="ant-table-cell">
                        <Link to={item.id}>
                          {item.attributes.staff.fullname}
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

export default PerformanceByUser;
