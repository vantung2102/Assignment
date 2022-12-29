import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { TiArrowUnsorted } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
  departmentsSelector,
  destroyDepartment,
  fetchDepartment,
  showDepartment,
  sortDepartment,
  sortDepartmentDesc,
} from "../../features/department/departmentSlice";
import { Table } from "../Staff/staff";
import staff from "../Staff/staff.module.scss";
import FormDepartment from "./FormDepartment";

const Department = () => {
  const dispatch = useDispatch();

  const departments = useSelector(departmentsSelector);
  const [show, setShow] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    dispatch(showDepartment(id));
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchDepartment());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(destroyDepartment(id));
  };

  const handleSort = () => {
    dispatch(sortDepartment());
    setToggle(!toggle);
  };

  const handleSortDesc = () => {
    dispatch(sortDepartmentDesc());
    setToggle(!toggle);
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
                        <span className="table-column-title">Department</span>
                        <TiArrowUnsorted
                          onClick={toggle ? handleSortDesc : handleSort}
                        />
                      </div>
                    </th>

                    <th className="ant-table-cell text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((item, index) => (
                    <tr key={item.attributes?.id}>
                      <td className="ant-table-cell">{index}</td>
                      <td className="ant-table-cell">
                        {item.attributes?.name}
                      </td>

                      <td className="ant-table-cell">
                        <div className="d-flex justify-content-evenly">
                          <TbEdit
                            style={{
                              fontSize: "20px",
                            }}
                            onClick={() => handleShow(item.attributes.id)}
                          />
                          <RiDeleteBinLine
                            style={{
                              fontSize: "20px",
                            }}
                            onClick={() => handleDelete(item.attributes.id)}
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

      <FormDepartment isNew={false} show={show} close={handleClose} />
    </Row>
  );
};

export default Department;
