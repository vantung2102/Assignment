import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { TiArrowUnsorted } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobTitle,
  jobTitlesSelector,
  showJobTitle,
} from "../../features/jobTitle/jobTitleSlice";
import { Table } from "../Staff/staff";
import staff from "../Staff/staff.module.scss";
import FormJobTitle from "./FormJobTitle";

const JobTitle = () => {
  const dispatch = useDispatch();
  const jobTitles = useSelector(jobTitlesSelector);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    dispatch(showJobTitle(id));
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchJobTitle());
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
                        <TiArrowUnsorted />
                      </div>
                    </th>
                    <th className="ant-table-cell">
                      <div className={staff.TableColumnSorters}>
                        <span className="table-column-title">Position</span>
                        <TiArrowUnsorted />
                      </div>
                    </th>

                    <th className="ant-table-cell text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {jobTitles &&
                    jobTitles.map((item, index) => (
                      <tr key={item.attributes.id}>
                        <td className="ant-table-cell">{index}</td>
                        <td className="ant-table-cell">
                          {item.attributes.title}
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

      <FormJobTitle isNew={false} show={show} close={handleClose} />
    </Row>
  );
};

export default JobTitle;
