import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { TiArrowUnsorted } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
  destroyProperty,
  fetchProperties,
  metaPropertySelector,
  propertiesSelector,
  showProperty,
} from "../../features/property/propertySlice";
import { Table } from "../Staff/staff";
import FormProperties from "./FormProperties";
import staff from "../Staff/staff.module.scss";
import { Link } from "react-router-dom";
import { TableCell, TableComponent } from "../../global/jsx/common";
import TableHead from "../Table/TableHead";
import ActionColumn from "../Table/ActionColumn";
import Paginate from "../Paginate/Paginate";

const Properties = () => {
  const dispatch = useDispatch();
  const properties = useSelector(propertiesSelector);
  const meta = useSelector(metaPropertySelector);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  useEffect(() => {
    if (!meta) return;
    setItemsCount(meta.total_count);
    setItemsPerPage(meta.page_size);
  }, [meta]);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    dispatch(showProperty(id));
    setShow(true);
  };

  const handleDelete = (id) => {
    dispatch(destroyProperty(id));
  };

  const getCurrentPage = (number) => {
    dispatch(fetchProperties(number));
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <TableComponent>
            <thead>
              <tr>
                <TableHead title="STT" />
                <TableHead title="Name" />
                <TableHead title="status" centerTitle={true} />
                <TableHead title="Action" centerTitle={true} />
                <TableHead title="View history" centerTitle={true} />
              </tr>
            </thead>
            <tbody>
              {properties?.map((item, index) => {
                const { id, name, status } = item.attributes;
                return (
                  <tr key={id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Link to={item.id}>{name}</Link>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant={
                          status === "available"
                            ? "outline-success"
                            : "outline-danger"
                        }
                      >
                        {status}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <ActionColumn
                        id={id}
                        edit={handleShow}
                        destroy={handleDelete}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Link to={`${id}/history`}>View</Link>
                    </TableCell>
                  </tr>
                );
              })}
            </tbody>
          </TableComponent>
        </Col>

        <FormProperties isNew={false} show={show} close={handleClose} />
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

export default Properties;
