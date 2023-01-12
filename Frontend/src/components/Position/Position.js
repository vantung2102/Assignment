import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  destroyPosition,
  fetchPosition,
  metaPositionSelector,
  showPosition,
  sortPositionAsc,
  sortPositionDesc,
  positionsSelector,
} from "../../features/position/positionSlice";
import TableHead from "../Table/TableHead";
import FormPosition from "./FormPosition";
import {
  TableCell,
  TableComponent,
  TableResponsive,
} from "../../global/jsx/common";
import ActionColumn from "../Table/ActionColumn";
import Paginate from "../Paginate/Paginate";

const Position = () => {
  const dispatch = useDispatch();

  const positions = useSelector(positionsSelector);
  const meta = useSelector(metaPositionSelector);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [show, setShow] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    dispatch(showPosition(id));
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchPosition());
  }, [dispatch]);

  useEffect(() => {
    if (!meta) return;
    setItemsCount(meta.total_count);
    setItemsPerPage(meta.page_size);
  }, [meta]);

  const handleDelete = (id) => {
    dispatch(destroyPosition(id));
  };

  const handleSortAsc = () => {
    dispatch(sortPositionAsc());
    setToggle(!toggle);
  };

  const handleSortDesc = () => {
    dispatch(sortPositionDesc());
    setToggle(!toggle);
  };

  const getCurrentPage = (number) => {
    dispatch(fetchPosition(number));
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
                    title="Position"
                    isSort={true}
                    toggle={toggle}
                    desc={handleSortDesc}
                    asc={handleSortAsc}
                  />
                  <TableHead title="Action" centerTitle={true} />
                </tr>
              </thead>
              <tbody>
                {positions?.map((item, index) => {
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

        <FormPosition isNew={false} show={show} close={handleClose} />
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

export default Position;
