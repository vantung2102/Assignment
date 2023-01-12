import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { AiFillInfoCircle } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiArrowUnsorted } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  historiesByProperty,
  historiesByPropertySelector,
  propertyProvidingHistoriesSelector,
} from "../../../features/propertyProvidingHistories/propertyProvidingHistoriesSlice";
import {
  TableCell,
  TableComponent,
  TableResponsive,
} from "../../../global/jsx/common";
import { Table } from "../../Staff/staff";
import staff from "../../Staff/staff.module.scss";
import TableHead from "../../Table/TableHead";

const HistoriesByProperty = ({ idRequest }) => {
  const dispatch = useDispatch();
  const propertyProvidingHistories = useSelector(historiesByPropertySelector);

  useEffect(() => {
    dispatch(historiesByProperty(idRequest));
  }, []);

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
                <TableHead title="Providing Date" />
                <TableHead title="Type" />
              </tr>
            </thead>
            <tbody>
              {propertyProvidingHistories?.map((item, index) => {
                const { id, provider, receiver, property, status, created_at } =
                  item.attributes;

                return (
                  <tr key={id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{provider?.fullname}</TableCell>

                    <TableCell>{receiver?.fullname}</TableCell>
                    <TableCell>{property?.name}</TableCell>
                    <TableCell>{created_at}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant={
                          status == "recall"
                            ? "outline-danger"
                            : "outline-success"
                        }
                      >
                        {status === "recall" ? "recalled" : "provided"}
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
};

export default HistoriesByProperty;
