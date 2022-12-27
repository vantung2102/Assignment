import React, { useEffect, useState } from "react";
import { Col, Dropdown, Row } from "react-bootstrap";
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
  responseProperty,
  showRequestProperty,
} from "../../features/requestProperty/requestPropertySlice";
import { Table } from "../Staff/staff";
import { Link } from "react-router-dom";

const RequestProperty = () => {
  const dispatch = useDispatch();
  const requestProperties = useSelector(requestPropertiesSelector);
  const [status, setStatus] = useState("pending");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    dispatch(showRequestProperty(id));
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchRequestProperties());
  }, []);

  const handleDelete = (id) => {
    dispatch(destroyRequestProperty(id));
  };

  const handleResponse = (id, type) => {
    const data = {
      id: id,
      type: type,
    };
    dispatch(responseProperty(data));
  };
  console.log(requestProperties);

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
                        <span className="table-column-title">requester</span>
                        <TiArrowUnsorted />
                      </div>
                    </th>

                    <th className="ant-table-cell">
                      <div className={staff.TableColumnSorters}>
                        <span className="table-column-title">Type</span>
                        <TiArrowUnsorted />
                      </div>
                    </th>
                    <th className="ant-table-cell text-center">status</th>
                    <th className="ant-table-cell text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requestProperties?.map((item, index) => (
                    <tr key={item.attributes.id}>
                      <td className="ant-table-cell">{index}</td>
                      <td className="ant-table-cell">
                        <Link to={item.id}>
                          {item.attributes.requester.fullname}
                        </Link>
                      </td>
                      <td className="ant-table-cell">
                        {item.attributes.request_type}
                      </td>

                      <td className="ant-table-cell d-flex justify-content-center">
                        <Dropdown>
                          <Dropdown.Toggle
                            variant={
                              item.attributes.status == "pending"
                                ? "warning"
                                : item.attributes.status == "approved"
                                ? "success"
                                : "danger"
                            }
                          >
                            {item.attributes.status}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() =>
                                handleResponse(item.id, "approved")
                              }
                            >
                              Approved
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handleResponse(item.id, "cancelled")
                              }
                            >
                              Cancelled
                            </Dropdown.Item>
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

      <FormRequestProperty isNew={false} show={show} close={handleClose} />
    </Row>
  );
};

export default RequestProperty;
