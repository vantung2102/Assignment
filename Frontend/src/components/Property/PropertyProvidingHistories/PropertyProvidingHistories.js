import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiFillInfoCircle } from "react-icons/ai";
import { TiArrowUnsorted } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
  destroyPropertyProvidingHistory,
  fetchPropertyProvidingHistories,
  propertyProvidingHistoriesSelector,
  showPropertyProvidingHistory,
} from "../../../features/propertyProvidingHistories/propertyProvidingHistoriesSlice";
import { Table } from "../../Staff/staff";
import staff from "../../Staff/staff.module.scss";
import { Link } from "react-router-dom";
import {
  TableCell,
  TableComponent,
  TableResponsive,
} from "../../../global/jsx/common";
import TableHead from "../../Table/TableHead";

const PropertyProvidingHistories = () => {
  const dispatch = useDispatch();

  const propertyProvidingHistories = useSelector(
    propertyProvidingHistoriesSelector
  );

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    dispatch(showPropertyProvidingHistory(id));
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchPropertyProvidingHistories());
  }, []);

  const handleDelete = (id) => {
    dispatch(destroyPropertyProvidingHistory(id));
  };

  return (
    <Row>
      <Col md={12}>
        <TableResponsive>
          <TableComponent>
            <thead>
              <tr>
                <TableHead title="STT" />
                <TableHead title="Provider" />
                <TableHead title="Receiver" />
                <TableHead title="Property" />
                <TableHead title="Status" />
                <TableHead title="Action" centerTitle={true} />
              </tr>
            </thead>
            <tbody>
              {propertyProvidingHistories?.map((item, index) => {
                const { id, provider, receiver, property, status } =
                  item.attributes;
                return (
                  <tr key={id}>
                    <TableCell>{index}</TableCell>
                    <TableCell>{provider?.fullname}</TableCell>

                    <TableCell>{receiver?.fullname}</TableCell>
                    <TableCell>{property?.name}</TableCell>
                    <TableCell>
                      <Button
                        variant={
                          status === "recall"
                            ? "outline-danger"
                            : "outline-success"
                        }
                      >
                        {status === "recall" ? "recalled" : "provided"}
                      </Button>
                    </TableCell>

                    <TableCell>
                      <div className="d-flex justify-content-evenly">
                        <Link to={item.id}>
                          <AiFillInfoCircle />
                        </Link>

                        <RiDeleteBinLine onClick={() => handleDelete(id)} />
                      </div>
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
};

export default PropertyProvidingHistories;
