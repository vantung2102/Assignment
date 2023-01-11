import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { TiArrowUnsorted } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import FormRequestProperty from "./FormRequestProperty";
import staff from "../Staff/staff.module.scss";
import {
  destroyRequestProperty,
  fetchRequestProperties,
  requestPropertiesSelector,
  searchRequestProperty,
  showRequestProperty,
} from "../../features/requestProperty/requestPropertySlice";
import { Table } from "../Staff/staff";
import { Link } from "react-router-dom";
import Select from "react-select";
import {
  fetchStaffChart,
  staffChartSelector,
} from "../../features/staff/staffSlice";
import { TableCell, TableComponent } from "../../global/jsx/common";
import TableHead from "../Table/TableHead";
import ActionColumn from "../Table/ActionColumn";

const RequestProperty = () => {
  const dispatch = useDispatch();
  const requestProperties = useSelector(requestPropertiesSelector);
  const staffs = useSelector(staffChartSelector);

  useEffect(() => {
    dispatch(fetchRequestProperties());
    dispatch(fetchStaffChart());
  }, [dispatch]);

  const [show, setShow] = useState(false);
  const [idStaff, setIdStaff] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    dispatch(showRequestProperty(id));
    setShow(true);
  };

  const getOption = (arr, attr) => {
    return arr?.map((item) => {
      return { value: item.id, label: item.attributes[attr] };
    });
  };

  const handleDelete = (id) => {
    dispatch(destroyRequestProperty(id));
  };

  const handleSearch = (id) => {
    dispatch(searchRequestProperty(id));
    setIdStaff(id);
  };

  return (
    <>
      <Row className="mb-2 justify-content-end">
        <Col md={3} sm={6}>
          <Select
            value={getOption(staffs, "fullname")?.filter(
              (option) => option.value === idStaff
            )}
            options={getOption(staffs, "fullname")}
            placeholder="Search By Name"
            onChange={(e) => handleSearch(e.value)}
          />
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <TableComponent>
            <thead>
              <tr>
                <TableHead title="STT" />
                <TableHead title="Requester" />
                <TableHead title="Type" />
                <TableHead title="status" centerTitle={true} />
                <TableHead title="Action" centerTitle={true} />
              </tr>
            </thead>
            <tbody>
              {requestProperties?.map((item, index) => {
                console.log(item);
                const { id, requester, request_type, status } = item.attributes;
                return (
                  <tr key={id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Link to={item.id}>{requester.fullname}</Link>
                    </TableCell>
                    <TableCell>{request_type}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant={
                          status === "pending"
                            ? "outline-warning"
                            : status === "approved"
                            ? "outline-success"
                            : "outline-danger"
                        }
                      >
                        {status}
                      </Button>
                    </TableCell>

                    <TableCell>
                      <div className="d-flex justify-content-evenly">
                        <RiDeleteBinLine onClick={() => handleDelete(id)} />
                      </div>
                    </TableCell>
                  </tr>
                );
              })}
            </tbody>
          </TableComponent>
        </Col>

        <FormRequestProperty isNew={false} show={show} close={handleClose} />
      </Row>
    </>
  );
};

export default RequestProperty;
