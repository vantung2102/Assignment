import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";

// =========== Style =================
import staff from "./staff.module.scss";
import { Table } from "./staff";
import common from "../../global/module/common.module.scss";

// =========== Icon =================
import { TiArrowUnsorted } from "react-icons/ti";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";

import avatar from "../../assets/images/home/user.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStaff,
  staffSelector,
  metaSelector,
  staffsSelector,
} from "../../features/staff/staffSlice";
import Paginate from "../Paginate/Paginate";
import {
  fetchPosition,
  positionsSelector,
} from "../../features/position/positionSlice";
import {
  departmentsSelector,
  fetchDepartment,
} from "../../features/department/departmentSlice";
import {
  fetchJobTitle,
  jobTitleSelector,
} from "../../features/jobTitle/jobTitleSlice";

const StaffTable = () => {
  const staffs = useSelector(staffsSelector);
  const meta = useSelector(metaSelector);
  const positions = useSelector(positionsSelector);
  const departments = useSelector(departmentsSelector);
  const jobTitles = useSelector(jobTitleSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStaff());
    dispatch(fetchPosition());
    dispatch(fetchDepartment());
    dispatch(fetchJobTitle());
  }, []);

  const ActiveOptions = [
    { value: true, label: "Active" },
    { value: false, label: "Inactive" },
  ];

  const getOption = (arr, attr) => {
    return arr.map((item) => {
      return { value: item.id, label: item.attributes[attr] };
    });
  };

  return (
    <>
      {/* ============= Filter =============== */}
      <Form>
        <Row className="filter-row">
          <Col md={3} sm={6}>
            <div className={[common.FormGroup, staff.FormFocus].join(" ")}>
              <input type="text" className={staff.FormControl} />
              <label className={staff.FocusLabel}>Employee Name</label>
            </div>
          </Col>

          <Col md={3} sm={6}>
            <Form.Group className="form-focus select-focus">
              <Select
                name="form-field-departments"
                value="one"
                options={getOption(departments, "name")}
                placeholder="Select Departments"
              />
            </Form.Group>
          </Col>

          <Col md={3} sm={6}>
            <Form.Group className="form-focus select-focus">
              <Select
                name="form-field-positions"
                value="one"
                options={getOption(positions, "name")}
                placeholder="Select Positions"
              />
            </Form.Group>
          </Col>

          <Col md={2} sm={6}>
            <Form.Group className="form-focus select-focus">
              <Select
                name="form-field-name"
                value="one"
                options={ActiveOptions}
                placeholder="Account Active"
              />
            </Form.Group>
          </Col>

          <Col md={1} sm={6}>
            <Link className="btn btn-success btn-block w-100">Search</Link>
          </Col>
        </Row>
      </Form>

      {/* ============= Table =============== */}

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
                          <span className="table-column-title">Name</span>
                          <TiArrowUnsorted />
                        </div>
                      </th>
                      <th className="ant-table-cell">
                        <div className={staff.TableColumnSorters}>
                          <span className="table-column-title">
                            Employee ID
                          </span>
                          <TiArrowUnsorted />
                        </div>
                      </th>
                      <th className="ant-table-cell">
                        <div className={staff.TableColumnSorters}>
                          <span className="table-column-title">Email</span>
                          <TiArrowUnsorted />
                        </div>
                      </th>
                      <th className="ant-table-cell">
                        <div className={staff.TableColumnSorters}>
                          <span className="table-column-title">Mobile</span>
                          <TiArrowUnsorted />
                        </div>
                      </th>
                      <th className="ant-table-cell">
                        <div className={staff.TableColumnSorters}>
                          <span className="table-column-title">Join Date</span>
                          <TiArrowUnsorted />
                        </div>
                      </th>

                      <th className="ant-table-cell text-center">
                        <div className={staff.TableColumnSorters}>
                          <span className="table-column-title">Position</span>
                          <TiArrowUnsorted />
                        </div>
                      </th>

                      <th className="ant-table-cell text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffs &&
                      staffs.map((item) => (
                        <tr key={item.id}>
                          <td className="ant-table-cell">
                            <h2 className="table-avatar">
                              <Link className={staff.avatar}>
                                <img alt="" src={avatar} />
                              </Link>
                              <Link to={item.id}>
                                {item.attributes.fullname}
                                <span>Web Designer</span>
                              </Link>
                            </h2>
                          </td>
                          <td className="ant-table-cell">{item.id}</td>
                          <td className="ant-table-cell">
                            {item.attributes.email}
                          </td>
                          <td className="ant-table-cell">0999999999</td>
                          <td className="ant-table-cell">
                            {item.attributes.date_of_birth}
                          </td>
                          <td className="ant-table-cell">
                            {item.attributes.position.name}
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
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </div>

            <div className="pagination"></div>
          </div>
        </Col>
      </Row>

      {/* <Paginate meta={meta} /> */}
      <Pagination className="d-flex justify-content-end">
        <Pagination.First />
        <Pagination.Prev disabled />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Item active>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>

        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </>
  );
};

export default StaffTable;
