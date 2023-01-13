import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchPerformanceByUser,
  selfReviewsPerformanceSelector,
} from "../../features/performance/performanceSlice";
import {
  TableCell,
  TableComponent,
  TableResponsive,
} from "../../global/jsx/common";
import TableHead from "../Table/TableHead";

const PerformanceByUser = () => {
  const dispatch = useDispatch();
  const selfReview = useSelector(selfReviewsPerformanceSelector);
  const [inProgress, setInProgress] = useState([]);
  const [finished, setFinished] = useState([]);

  useEffect(() => {
    dispatch(fetchPerformanceByUser());
  }, [dispatch]);

  useEffect(() => {
    if (!selfReview) return;
    const inProgress = selfReview.filter(
      (item) => item.attributes.active === true
    );
    const finished = selfReview.filter(
      (item) => item.attributes.active !== true
    );

    setInProgress(inProgress);
    setFinished(finished);
  }, [selfReview]);

  return (
    <Row>
      <Col md={12}>
        <>
          <h4>In Progress</h4>
          <TableResponsive>
            <TableComponent>
              <thead>
                <tr>
                  <TableHead title="STT" />
                  <TableHead title="Name" />
                  <TableHead title="Start day" />
                  <TableHead title="End day" />
                  <TableHead title="Status" />
                </tr>
              </thead>
              <tbody>
                {inProgress?.map((item, index) => {
                  const { id, staff, active, status, start_date, end_date } =
                    item.attributes;

                  return (
                    <tr key={id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Link to={item.id}>{staff?.fullname}</Link>
                      </TableCell>
                      {/* <TableCell>
                      <Button
                        size="sm"
                        variant={active ? "outline-success" : "outline-danger"}
                      >
                        {active ? "Active" : "Inactive"}
                      </Button>
                    </TableCell> */}
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
                    </tr>
                  );
                })}
              </tbody>
            </TableComponent>
          </TableResponsive>
        </>
        <div className="mt-4">
          <h4>Finished</h4>
          <TableResponsive>
            <TableComponent>
              <thead>
                <tr>
                  <TableHead title="STT" />
                  <TableHead title="Name" />
                  <TableHead title="Start day" />
                  <TableHead title="End day" />
                  <TableHead title="Status" />
                </tr>
              </thead>
              <tbody>
                {finished?.map((item, index) => {
                  const { id, staff, active, status, start_date, end_date } =
                    item.attributes;

                  return (
                    <tr key={id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Link to={item.id}>{staff?.fullname}</Link>
                      </TableCell>
                      {/* <TableCell>
                      <Button
                        size="sm"
                        variant={active ? "outline-success" : "outline-danger"}
                      >
                        {active ? "Active" : "Inactive"}
                      </Button>
                    </TableCell> */}
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
                    </tr>
                  );
                })}
              </tbody>
            </TableComponent>
          </TableResponsive>
        </div>
      </Col>
    </Row>
  );
};

export default PerformanceByUser;
