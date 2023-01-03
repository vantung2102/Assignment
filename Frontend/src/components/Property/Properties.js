import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { TiArrowUnsorted } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
  destroyProperty,
  fetchProperties,
  propertiesSelector,
  showProperty,
} from "../../features/property/propertySlice";
import { Table } from "../Staff/staff";
import FormProperties from "./FormProperties";
import staff from "../Staff/staff.module.scss";
import { Link } from "react-router-dom";

const Properties = () => {
  const dispatch = useDispatch();
  const properties = useSelector(propertiesSelector);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    dispatch(showProperty(id));
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchProperties());
  }, []);

  const handleDelete = (id) => {
    dispatch(destroyProperty(id));
  };

  return (
    <Row>
      <Col md={12}>
        <div className="table-responsive">
          <div className="table">
            <div className="table-content">
              <Table>
                <thead>
                  <tr>
                    <th className="ant-table-cell">
                      <div className={staff.TableColumnSorters}>
                        <span className="table-column-title">STT</span>
                        <TiArrowUnsorted />
                      </div>
                    </th>
                    <th className="ant-table-cell">
                      <div className={staff.TableColumnSorters}>
                        <span className="table-column-title">Property</span>
                        <TiArrowUnsorted />
                      </div>
                    </th>
                    <th className="ant-table-cell text-center">Status</th>
                    <th className="ant-table-cell text-center">Action</th>
                    <th className="ant-table-cell text-center">View history</th>
                  </tr>
                </thead>
                <tbody>
                  {properties?.map((item, index) => (
                    <tr key={item.attributes.id}>
                      <td className="ant-table-cell">{index}</td>
                      <td className="ant-table-cell">
                        <Link to={item.id}>{item.attributes.name}</Link>
                      </td>
                      <td className="ant-table-cell d-flex justify-content-center">
                        <Button
                          variant={
                            item.attributes.status == "available"
                              ? "success"
                              : "danger"
                          }
                        >
                          {item.attributes.status}
                        </Button>
                      </td>

                      <td className="ant-table-cell">
                        <div className="d-flex justify-content-evenly">
                          <TbEdit
                            style={{
                              fontSize: "20px",
                            }}
                            onClick={() => handleShow(item.attributes.id)}
                          />
                          <RiDeleteBinLine
                            style={{
                              fontSize: "20px",
                            }}
                            onClick={() => handleDelete(item.attributes.id)}
                          />
                        </div>
                      </td>
                      <td className="ant-table-cell text-center">
                        <Link to={`${item.id}/history`}>View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Col>

      <FormProperties isNew={false} show={show} close={handleClose} />
    </Row>
  );
};

export default Properties;
