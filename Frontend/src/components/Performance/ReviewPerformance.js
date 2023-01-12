import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchReviewForStaff,
  reviewForStaffsSelector,
} from "../../features/performance/performanceSlice";
import {
  TableCell,
  TableComponent,
  TableResponsive,
} from "../../global/jsx/common";
import EmptyData from "../Empty/EmptyData";
import TableHead from "../Table/TableHead";

const ReviewPerformance = () => {
  const dispatch = useDispatch();
  const reviewForStaff = useSelector(reviewForStaffsSelector);

  useEffect(() => {
    dispatch(fetchReviewForStaff());
  }, [dispatch]);

  if (reviewForStaff?.length === 0) {
    return <EmptyData />;
  } else {
    return (
      <Row>
        <Col md={12}>
          <TableResponsive>
            <TableComponent>
              <thead>
                <tr>
                  <TableHead title="STT" />
                  <TableHead title="Name" />
                  <TableHead title="Active" />
                  <TableHead title="Start day" />
                  <TableHead title="End day" />
                  <TableHead title="Status" />
                </tr>
              </thead>
              <tbody>
                {reviewForStaff?.map((item, index) => {
                  const { id, staff, active, status, start_date, end_date } =
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
                          variant={
                            active ? "outline-success" : "outline-danger"
                          }
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
                    </tr>
                  );
                })}
              </tbody>
            </TableComponent>
          </TableResponsive>
        </Col>
      </Row>
    );
  }
};

export default ReviewPerformance;
