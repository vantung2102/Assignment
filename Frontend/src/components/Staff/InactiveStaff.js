import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Image, Row } from "react-bootstrap";
import staff from "./staff.module.scss";
import {
  TableComponent,
  TableCell,
  TableResponsive,
} from "../../global/jsx/common.jsx";
import avatar from "../../assets/images/home/user.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  destroyStaff,
  fetchAllStaff,
  fetchInactiveStaff,
  fetchProfile,
  fetchStaff,
  inactiveStaffsSelector,
  metaStaffSelector,
  permanentDestroy,
  recoverStaff,
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
import { getRoleSelector } from "../../features/auth/authSlice";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiAddToQueue } from "react-icons/bi";

const InactiveStaff = () => {
  const dispatch = useDispatch();

  const role = useSelector(getRoleSelector);
  const staffs = useSelector(inactiveStaffsSelector);
  const meta = useSelector(metaStaffSelector);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [show, setShow] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    dispatch(fetchInactiveStaff());
    dispatch(fetchAllStaff());
    dispatch(fetchAllPosition());
    dispatch(fetchAllDepartment());
    dispatch(fetchAllJobTitle());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(permanentDestroy(id));
  };

  const handleRecover = (id) => {
    dispatch(recoverStaff(id));
  };

  return (
    <>
      <FilterStaff />

      <Row>
        <Col md={12}>
          <TableResponsive>
            <TableComponent>
              <thead>
                <tr>
                  <TableHead title="STT" />
                  <TableHead title="Name" />
                  <TableHead title="Employee ID" />
                  <TableHead title="Email" />
                  <TableHead title="Phone" />
                  <TableHead title="Join Date" />
                  <TableHead title="Position" />

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
                          <Link className={staff.avatar}>
                            <Image alt="Avatar" src={avatar} />
                          </Link>

                          <Link>
                            {fullname}
                            <span>{job_title?.title}</span>
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
                          <div className="d-flex justify-content-evenly">
                            <BiAddToQueue onClick={() => handleRecover(id)} />
                            <RiDeleteBinLine onClick={() => handleDelete(id)} />
                          </div>
                        </TableCell>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </TableComponent>
          </TableResponsive>
        </Col>
      </Row>
    </>
  );
};

export default InactiveStaff;
