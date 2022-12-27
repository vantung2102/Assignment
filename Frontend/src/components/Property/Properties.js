import React, { useEffect, useState } from "react";
import { Col, Dropdown, Row } from "react-bootstrap";
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

                    <th className="ant-table-cell ">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {properties?.map((item, index) => (
                    <tr key={item.attributes.id}>
                      <td className="ant-table-cell">{index}</td>
                      <td className="ant-table-cell">{item.attributes.name}</td>
                      <td className="ant-table-cell d-flex justify-content-center">
                        <Dropdown>
                          <Dropdown.Toggle variant="success">
                            available
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item>available</Dropdown.Item>
                            <Dropdown.Item>used</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
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
