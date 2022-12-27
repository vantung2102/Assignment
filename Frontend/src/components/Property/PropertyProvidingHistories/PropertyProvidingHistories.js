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

  const handleShowDetail = () => {};

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
                      </div>
                    </th>
                    <th className="ant-table-cell">
                      <div className={staff.TableColumnSorters}>
                        <span className="table-column-title">Provider</span>
                        <TiArrowUnsorted />
                      </div>
                    </th>
                    <th className="ant-table-cell">
                      <div className={staff.TableColumnSorters}>
                        <span className="table-column-title">Receiver</span>
                        <TiArrowUnsorted />
                      </div>
                    </th>
                    <th className="ant-table-cell">
                      <div className={staff.TableColumnSorters}>
                        <span className="table-column-title">Property</span>
                        <TiArrowUnsorted />
                      </div>
                    </th>
                    <th className="ant-table-cell">
                      <div className={staff.TableColumnSorters}>
                        <span className="table-column-title">Status</span>
                        <TiArrowUnsorted />
                      </div>
                    </th>

                    <th className="ant-table-cell text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {propertyProvidingHistories?.map((item, index) => (
                    <tr key={item.attributes?.id}>
                      <td className="ant-table-cell">{index}</td>
                      <td className="ant-table-cell">
                        {item.attributes?.provider.fullname}
                      </td>

                      <td className="ant-table-cell">
                        {item.attributes?.receiver.fullname}
                      </td>
                      <td className="ant-table-cell">
                        {item.attributes?.property.name}
                      </td>
                      <td className="ant-table-cell">
                        <Button
                          variant={
                            item.attributes?.status == "recall"
                              ? "danger"
                              : "success"
                          }
                        >
                          {item.attributes?.status}
                        </Button>
                      </td>

                      <td className="ant-table-cell">
                        <div className="d-flex justify-content-evenly">
                          <Link to={item.id}>
                            <AiFillInfoCircle
                              style={{
                                fontSize: "20px",
                              }}
                            />
                          </Link>

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
    </Row>
  );
};

export default PropertyProvidingHistories;
