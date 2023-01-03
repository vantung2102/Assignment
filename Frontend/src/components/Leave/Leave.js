import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { TiArrowUnsorted } from "react-icons/ti";
import staff from "../Staff/staff.module.scss";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import FormLeave from "./FormLeave";
import {
  destroyLeave,
  fetchLeave,
  leavesSelector,
  showLeave,
} from "../../features/leave/leaveSlice";
import { Link } from "react-router-dom";

const Leave = () => {
  const dispatch = useDispatch();
  const leaves = useSelector(leavesSelector);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    dispatch(showLeave(id));
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchLeave());
  }, []);

  const handleDeletePosition = (id) => {
    dispatch(destroyLeave(id));
  };

  const TotalDayOff = (obj) => {
    return (
      obj.casual_leave +
      obj.compassionate_leave +
      obj.marriage_leave +
      obj.maternity_leave +
      obj.paternity_leave +
      obj.unpaid_leave
    );
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
                        <span className="table-column-title">
                          Allowed days off
                        </span>
                        <TiArrowUnsorted />
                      </div>
                    </th>
                    <th className="ant-table-cell">
                      <div className={staff.TableColumnSorters}>
                        <span className="table-column-title">
                          Total days off
                        </span>
                        <TiArrowUnsorted />
                      </div>
                    </th>
                    <th className="ant-table-cell text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves?.map((item, index) => (
                    <tr key={item.attributes.id}>
                      <td className="ant-table-cell">{index}</td>
                      <td className="ant-table-cell">
                        <Link to={item.id}>
                          {item.attributes.staff.fullname}
                        </Link>
                      </td>
                      <td className="ant-table-cell">
                        {item.attributes.allowed_number_of_days_off}
                      </td>
                      <td className="ant-table-cell">
                        {TotalDayOff(item.attributes)}
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

      <FormLeave isNew={false} show={show} close={handleClose} />
    </Row>
  );
};

export default Leave;
