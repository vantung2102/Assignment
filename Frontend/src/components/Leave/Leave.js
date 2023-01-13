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
                  <TableHead title="Casual (12)" centerTitle={true} />
                  <TableHead title="Unpaid (15)" centerTitle={true} />
                  <TableHead title="Marriage (3)" centerTitle={true} />
                  <TableHead title="Compassionate (3)" centerTitle={true} />
                  <TableHead title="Paternity (1)" centerTitle={true} />
                  <TableHead title="Maternity (180)" centerTitle={true} />
                  <TableHead title="Total (day)" centerTitle={true} />
                </tr>
              </thead>
              <tbody>
                {leaves?.map((item, index) => {
                  const {
                    id,
                    staff,
                    casual_leave,
                    marriage_leave,
                    unpaid_leave,
                    compassionate_leave,
                    paternity_leave,
                    maternity_leave,
                  } = item.attributes;
                  return (
                    <tr key={id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Link to={item.id}>{staff?.fullname}</Link>
                      </TableCell>
                      <TableCell className="text-center">
                        {casual_leave}
                      </TableCell>
                      <TableCell className="text-center">
                        {unpaid_leave}
                      </TableCell>
                      <TableCell className="text-center">
                        {marriage_leave}
                      </TableCell>
                      <TableCell className="text-center">
                        {compassionate_leave}
                      </TableCell>
                      <TableCell className="text-center">
                        {paternity_leave}
                      </TableCell>
                      <TableCell className="text-center">
                        {maternity_leave}
                      </TableCell>
                      <TableCell className="text-center">
                        {TotalDayOff(item.attributes)}
                      </TableCell>
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
