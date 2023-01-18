import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPerformance,
  isOpenPerformanceSelector,
  performancesSelector,
  remindPerformance,
} from "../../features/performance/performanceSlice";
import FormPerformance from "./FormPerformance";
import { Link } from "react-router-dom";
import TableHead from "../Table/TableHead";
import { TableCell, TableComponent } from "../../global/jsx/common";
import EmptyData from "../Empty/EmptyData";

const AdminPerformance = () => {
  const dispatch = useDispatch();
  const performances = useSelector(performancesSelector);
  const isOpenPerformance = useSelector(isOpenPerformanceSelector);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handRemind = (id) => {
    dispatch(remindPerformance(id));
  };

  useEffect(() => {
    dispatch(fetchPerformance());
  }, [dispatch]);

  // useEffect(() => {
  //   if (!isOpenPerformance) return;

  //   const timer = setInterval(() => {
  //     dispatch(fetchPerformance());
  //   }, 500);
  //   return () => clearInterval(timer);
  // }, [isOpenPerformance]);

  if (performances?.length === 0 || !performances) {
    return <EmptyData />;
  } else {
    return (
      <Row>
        <Col md={12}>
          <div className="table-responsive">
            <TableComponent className="table">
              <thead>
                <tr>
                  <TableHead title="STT" />
                  <TableHead title="Name" />
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
                        <Link to={`/performance_management/review/${id}`}>
                          {staff?.fullname}
                        </Link>
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
            </TableComponent>
          </div>
        </Col>

        <FormPerformance close={handleClose} show={show} />
      </Row>
    );
  }
};

export default AdminPerformance;
