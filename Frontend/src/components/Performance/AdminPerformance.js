import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPerformance,
  performancesSelector,
  remindPerformance,
} from "../../features/performance/performanceSlice";
import { Table } from "../Staff/staff";
import FormPerformance from "./FormPerformance";
import staff from "../Staff/staff.module.scss";
import { TiArrowUnsorted } from "react-icons/ti";
import { Link } from "react-router-dom";
import TableHead from "../Table/TableHead";
import { TableCell } from "../../global/jsx/common";

const AdminPerformance = () => {
  const dispatch = useDispatch();
  const performances = useSelector(performancesSelector);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handRemind = (id) => {
    dispatch(remindPerformance(id));
  };

  useEffect(() => {
    dispatch(fetchPerformance());
  }, [dispatch]);

  if (performances?.length === 0) {
    return "chua toi ky danh gia";
  } else {
    return (
      <Row>
        <Col md={12}>
          <Table>
            <thead>
              <tr>
                <TableHead title="STT" />
                <TableHead title="Name" />
                <TableHead title="Active" />
                <TableHead title="Start day" />
                <TableHead title="End day" />
                <TableHead title="Status" />
                <TableHead title="Action" />
              </tr>
            </thead>
            <tbody>
              {performances?.map((item, index) => {
                const { id, staff, active, start_date, end_date, status } =
                  item.attributes;
                return (
                  <tr key={id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Link to={item.id}>{staff?.fullname}</Link>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant={active ? "outline-success" : "outline-danger"}
                      >
                        {active ? "Active" : "Inactive"}
                      </Button>
                    </TableCell>

                    <TableCell>{start_date}</TableCell>
                    <TableCell>{end_date}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant={
                          status === "completed"
                            ? "outline-success"
                            : "outline-danger"
                        }
                      >
                        {status === "completed" ? "completed" : "in progress"}
                      </Button>
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handRemind(item.id)}
                      >
                        Remind
                      </Button>
                    </TableCell>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>

        <FormPerformance close={handleClose} show={show} />
      </Row>
    );
  }
};

export default AdminPerformance;
