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
import { Table } from "../../Staff/staff";
import staff from "../../Staff/staff.module.scss";

const HistoriesByProperty = ({ idRequest }) => {
  const dispatch = useDispatch();
  const propertyProvidingHistories = useSelector(historiesByPropertySelector);

  useEffect(() => {
    dispatch(historiesByProperty(idRequest));
  }, []);

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
                        <span className="table-column-title">
                          Providing Date
                        </span>
                        <TiArrowUnsorted />
                      </div>
                    </th>
                    <th className="ant-table-cell">
                      <div className={staff.TableColumnSorters}>
                        <span className="table-column-title">Status</span>
                        <TiArrowUnsorted />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {propertyProvidingHistories?.map((item, index) => (
                    <tr key={item.attributes?.id}>
                      <td className="ant-table-cell">{index + 1}</td>
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
                        {item.attributes?.created_at}
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

export default HistoriesByProperty;
