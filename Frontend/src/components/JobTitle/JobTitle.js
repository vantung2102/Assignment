import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  destroyJobTitle,
  fetchJobTitle,
  jobTitlesSelector,
  metaJobTitleSelector,
  showJobTitle,
  sortJobTitleAsc,
  sortJobTitleDesc,
} from "../../features/jobTitle/jobTitleSlice";
import {
  TableCell,
  TableComponent,
  TableResponsive,
} from "../../global/jsx/common";
import Paginate from "../Paginate/Paginate";
import ActionColumn from "../Table/ActionColumn";
import TableHead from "../Table/TableHead";
import FormJobTitle from "./FormJobTitle";

const JobTitle = () => {
  const dispatch = useDispatch();

  const jobTitles = useSelector(jobTitlesSelector);
  const meta = useSelector(metaJobTitleSelector);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [show, setShow] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    dispatch(showJobTitle(id));
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchJobTitle());
  }, [dispatch]);

  useEffect(() => {
    if (!meta) return;
    setItemsCount(meta.total_count);
    setItemsPerPage(meta.page_size);
  }, [meta]);

  const handleDelete = (id) => {
    dispatch(destroyJobTitle(id));
  };

  const handleSortAsc = () => {
    dispatch(sortJobTitleAsc());
    setToggle(!toggle);
  };

  const handleSortDesc = () => {
    dispatch(sortJobTitleDesc());
    setToggle(!toggle);
  };

  const getCurrentPage = (number) => {
    dispatch(fetchJobTitle(number));
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <TableResponsive>
            <TableComponent>
              <thead>
                <tr>
                  <TableHead title="STT" />
                  <TableHead
                    title="Job Title"
                    isSort={true}
                    toggle={toggle}
                    desc={handleSortDesc}
                    asc={handleSortAsc}
                  />
                  <TableHead title="Action" centerTitle={true} />
                </tr>
              </thead>
              <tbody>
                {jobTitles?.map((item, index) => {
                  const { id, title } = item.attributes;

                  return (
                    <tr key={id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{title}</TableCell>
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

        <FormJobTitle isNew={false} show={show} close={handleClose} />
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

export default JobTitle;
