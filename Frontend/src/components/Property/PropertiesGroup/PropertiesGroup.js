import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { TiArrowUnsorted } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
  destroyPropertiesGroup,
  fetchPropertiesGroup,
  propertiesGroupSelector,
  showPropertiesGroup,
} from "../../../features/propertyGroup/propertyGroupSlice";
import { Table } from "../../Staff/staff";
import FormPropertiesGroup from "./FormPropertiesGroup";
import staff from "../../Staff/staff.module.scss";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  TableCell,
  TableComponent,
  TableResponsive,
} from "../../../global/jsx/common";
import TableHead from "../../Table/TableHead";
import ActionColumn from "../../Table/ActionColumn";

const PropertiesGroup = () => {
  const dispatch = useDispatch();
  const propertiesGroup = useSelector(propertiesGroupSelector);
  const [show, setShow] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    dispatch(showPropertiesGroup(id));
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchPropertiesGroup());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(destroyPropertiesGroup(id));
  };

  return (
    <Row>
      <Col md={12}>
        <TableResponsive>
          <TableComponent>
            <thead>
              <tr>
                <TableHead title="STT" />
                <TableHead title="Name" />
                <TableHead title="Action" centerTitle={true} />
              </tr>
            </thead>
            <tbody>
              {propertiesGroup?.map((item, index) => {
                const { id, name } = item.attributes;
                return (
                  <tr key={id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>
                      <ActionColumn
                        id={id}
                        edit={handleShow}
                        destroy={handleDelete}
                      />
                    </TableCell>
                  </tr>
                );
              })}
            </tbody>
          </TableComponent>
        </TableResponsive>
      </Col>

      <FormPropertiesGroup isNew={false} show={show} close={handleClose} />
    </Row>
  );
};

export default PropertiesGroup;
