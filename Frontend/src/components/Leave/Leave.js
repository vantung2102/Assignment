import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  destroyLeave,
  fetchLeave,
  leavesSelector,
  metaLeaveSelector,
  showLeave,
} from "../../features/leave/leaveSlice";
import { Link } from "react-router-dom";
import {
  TableCell,
  TableComponent,
  TableResponsive,
} from "../../global/jsx/common";
import TableHead from "../Table/TableHead";
import Paginate from "../Paginate/Paginate";

const Leave = () => {
  const dispatch = useDispatch();
  const leaves = useSelector(leavesSelector);
  const meta = useSelector(metaLeaveSelector);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    dispatch(fetchLeave());
  }, [dispatch]);

  useEffect(() => {
    if (!meta) return;
    setItemsCount(meta.total_count);
    setItemsPerPage(meta.page_size);
  }, [meta]);

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

  const getCurrentPage = (number) => {
    dispatch(fetchLeave(number));
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
                  <TableHead title="Name" />
                  <TableHead title="Allowed days off" />
                  <TableHead title="Total days off" />
                </tr>
              </thead>
              <tbody>
                {leaves?.map((item, index) => {
                  const { id, allowed_number_of_days_off, staff } =
                    item.attributes;
                  return (
                    <tr key={id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Link to={item.id}>{staff?.fullname}</Link>
                      </TableCell>

                      <td className="ant-table-cell">
                        {allowed_number_of_days_off}
                      </td>
                      <td className="ant-table-cell">
                        {TotalDayOff(item.attributes)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </TableComponent>
          </TableResponsive>
        </Col>
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

export default Leave;
