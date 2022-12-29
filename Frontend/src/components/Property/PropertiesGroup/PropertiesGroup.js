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
  }, []);

  const handleDelete = (id) => {
    dispatch(destroyPropertiesGroup(id));
  };

  const handleSortAsc = () => {
    // setToggle(!toggle);
    // dispatch(sortAsc());
  };

  const handleSortDesc = () => {
    // setToggle(!toggle);
    // dispatch(sortDesc());
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
                      </div>
                    </th>
                    <th className="ant-table-cell">
                      <div className={staff.TableColumnSorters}>
                        <span className="table-column-title">Title</span>
                        <TiArrowUnsorted
                          onClick={toggle ? handleSortAsc : handleSortDesc}
                        />
                      </div>
                    </th>

                    <th className="ant-table-cell text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {propertiesGroup?.map((item, index) => (
                    <tr key={item.attributes.id}>
                      <td className="ant-table-cell">{index}</td>
                      <td className="ant-table-cell">{item.attributes.name}</td>

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

      <FormPropertiesGroup isNew={false} show={show} close={handleClose} />
    </Row>
  );
};

export default PropertiesGroup;
