import React from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { TiArrowUnsorted } from "react-icons/ti";
import { Link } from "react-router-dom";
import staff from "../Staff/staff.module.scss";

const ReviewPerformance = () => {
  const performances = null;
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

                    <th className="ant-table-cell">Completion progress</th>
                    <th className="ant-table-cell">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {performances?.map((item, index) => (
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
                            item.attributes.status === "pending"
                              ? "warning"
                              : item.attributes.status === "approved"
                              ? "success"
                              : "outline-danger"
                          }
                        >
                          {item.attributes.status}
                        </Button>
                      </td>
                      <td className="ant-table-cell">0/5 completed</td>
                      <td className="ant-table-cell">remind</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Col>

      {/* <FormPerformance close={handleClose} show={show} /> */}
    </Row>
  );
};

export default ReviewPerformance;
