import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Image, Row } from "react-bootstrap";
import staff from "./staff.module.scss";
import { TableComponent, TableCell } from "../../global/jsx/common.jsx";
import avatar from "../../assets/images/home/user.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  destroyStaff,
  fetchAllStaff,
  fetchProfile,
  fetchStaff,
  metaStaffSelector,
  sortStaffAsc,
  sortStaffDesc,
  staffsSelector,
} from "../../features/staff/staffSlice";
import Paginate from "../Paginate/Paginate";
import { fetchAllPosition } from "../../features/position/positionSlice";
import { fetchAllDepartment } from "../../features/department/departmentSlice";
import { fetchAllJobTitle } from "../../features/jobTitle/jobTitleSlice";
import TableHead from "../Table/TableHead";
import FilterStaff from "./FilterStaff";
import FormStaff from "./FormStaff";
import ActionColumn from "../Table/ActionColumn";
import { getRoleSelector } from "../../features/auth/authSlice";

const StaffTable = () => {
  const dispatch = useDispatch();

  const role = useSelector(getRoleSelector);
  const staffs = useSelector(staffsSelector);
  const meta = useSelector(metaStaffSelector);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [show, setShow] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    dispatch(fetchStaff());
    dispatch(fetchAllStaff());
    dispatch(fetchAllPosition());
    dispatch(fetchAllDepartment());
    dispatch(fetchAllJobTitle());
  }, [dispatch]);

  useEffect(() => {
    if (!meta) return;
    setItemsCount(meta.total_count);
    setItemsPerPage(meta.page_size);
  }, [meta]);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    dispatch(fetchProfile(id));
    setShow(true);
  };
  const handleDelete = (id) => {
    dispatch(destroyStaff(id));
  };

  const handleSortAsc = () => {
    dispatch(sortStaffAsc());
    setToggle(!toggle);
  };

  const handleSortDesc = () => {
    dispatch(sortStaffDesc());
    setToggle(!toggle);
  };

  const getCurrentPage = (number) => {
    dispatch(fetchStaff(number));
  };

  return (
    <>
      <FilterStaff />

      <Row>
        <Col md={12}>
          <TableComponent>
            <thead>
              <tr>
                <TableHead title="STT" />
                <TableHead
                  title="Name"
                  isSort={true}
                  toggle={toggle}
                  desc={handleSortDesc}
                  asc={handleSortAsc}
                />
                <TableHead title="Employee ID" />
                <TableHead title="Email" />
                <TableHead title="Phone" />
                <TableHead title="Join Date" />
                <TableHead
                  title="Position"
                  isSort={true}
                  toggle={toggle}
                  desc={handleSortDesc}
                  asc={handleSortAsc}
                />

                {role && <TableHead title="Action" centerTitle={true} />}
              </tr>
            </thead>
            <tbody>
              {staffs?.map((item, index) => {
                const {
                  id,
                  fullname,
                  email,
                  join_date,
                  position,
                  job_title,
                  phone,
                } = item.attributes;

                return (
                  <tr key={id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <h2 className="table-avatar">
                        <Link to={item.id} className={staff.avatar}>
                          <Image alt="Avatar" src={avatar} />
                        </Link>

                        <Link to={item.id}>
                          {fullname}
                          <span>{job_title.title}</span>
                        </Link>
                      </h2>
                    </TableCell>

                    <TableCell>{id}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>{phone}</TableCell>
                    <TableCell>{join_date}</TableCell>
                    <TableCell>{position?.name}</TableCell>

                    {role && (
                      <TableCell>
                        <ActionColumn
                          id={id}
                          edit={handleShow}
                          role={role}
                          destroy={handleDelete}
                        />
                      </TableCell>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </TableComponent>
        </Col>

        <FormStaff isNew={false} show={show} close={handleClose} />
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

export default StaffTable;
