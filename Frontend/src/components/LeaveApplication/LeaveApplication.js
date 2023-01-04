import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../Staff/staff";
import FormLeaveApplication from "./FormLeaveApplication";
import staff from "../Staff/staff.module.scss";
import { TiArrowUnsorted } from "react-icons/ti";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  destroyLeaveApplication,
  fetchLeaveApplication,
  leaveApplicationsSelector,
  showLeaveApplication,
} from "../../features/leaveApplication/leaveApplicationSlice";
import { Link } from "react-router-dom";

const LeaveApplication = () => {
  const dispatch = useDispatch();
  const leaveApplications = useSelector(leaveApplicationsSelector);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    dispatch(showLeaveApplication(id));
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchLeaveApplication());
  }, []);

  const handleDeletePosition = (id) => {
    dispatch(destroyLeaveApplication(id));
  };

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
                    <th className="ant-table-cell text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveApplications?.map((item, index) => (
                    <tr key={item.attributes.id}>
                      <td className="ant-table-cell">{index}</td>
                      <td className="ant-table-cell">
                        <Link to={item.id}>
                          {item.attributes.staff.fullname}
                        </Link>
                      </td>
                      <td className="ant-table-cell">
                        {item.attributes.start_day}
                      </td>
                      <td className="ant-table-cell">
                        {item.attributes.end_day}
                      </td>
                      <td className="ant-table-cell">
                        <Button
                          variant={
                            item.attributes.status === "pending"
                              ? "warning"
                              : item.attributes.status === "approved"
                              ? "success"
                              : "danger"
                          }
                        >
                          {item.attributes.status}
                        </Button>
                      </td>

                      <td className="ant-table-cell">
                        <div className="d-flex justify-content-evenly">
                          <TbEdit
                            style={{
                              fontSize: "20px",
                            }}
                          />

                          <RiDeleteBinLine
                            style={{
                              fontSize: "20px",
                            }}
                            onClick={() =>
                              handleDeletePosition(item.attributes.id)
                            }
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

      <FormLeaveApplication isNew={false} show={show} close={handleClose} />
    </Row>
  );
};

export default LeaveApplication;
