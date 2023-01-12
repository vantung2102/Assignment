import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  departmentsSelector,
  destroyDepartment,
  fetchDepartment,
  metaDepartmentSelector,
  showDepartment,
  sortDepartmentAsc,
  sortDepartmentDesc,
} from "../../features/department/departmentSlice";
import {
  TableCell,
  TableComponent,
  TableResponsive,
} from "../../global/jsx/common";
import Paginate from "../Paginate/Paginate";
import ActionColumn from "../Table/ActionColumn";
import TableHead from "../Table/TableHead";
import FormDepartment from "./FormDepartment";

const Department = () => {
  const dispatch = useDispatch();

  const departments = useSelector(departmentsSelector);
  const meta = useSelector(metaDepartmentSelector);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [show, setShow] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    dispatch(fetchDepartment());
  }, [dispatch]);

  useEffect(() => {
    if (!meta) return;
    setItemsCount(meta.total_count);
    setItemsPerPage(meta.page_size);
  }, [meta]);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    dispatch(showDepartment(id));
    setShow(true);
  };

  const handleDelete = (id) => {
    dispatch(destroyDepartment(id));
  };

  const handleSortAsc = () => {
    dispatch(sortDepartmentAsc());
    setToggle(!toggle);
  };

  const handleSortDesc = () => {
    dispatch(sortDepartmentDesc());
    setToggle(!toggle);
  };

  const getCurrentPage = (number) => {
    dispatch(fetchDepartment(number));
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <TableResponsive>
            <TableComponent>
              <thead>
                <tr>
                  <TableHead title="STT" />
                  <TableHead
                    title="Department"
                    isSort={true}
                    toggle={toggle}
                    desc={handleSortDesc}
                    asc={handleSortAsc}
                  />
                  <TableHead title="Action" centerTitle={true} />
                </tr>
              </thead>
              <tbody>
                {departments?.map((item, index) => {
                  const { id, name } = item.attributes;

                  return (
                    <tr key={id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{name}</TableCell>
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
          </TableResponsive>
        </Col>

        <FormDepartment isNew={false} show={show} close={handleClose} />
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

export default Department;
