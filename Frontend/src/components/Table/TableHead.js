import React from "react";
import { TiArrowUnsorted } from "react-icons/ti";
import staff from "../Staff/staff.module.scss";

const TableHead = ({
  title,
  isSort = false,
  centerTitle = false,
  toggle,
  desc,
  asc,
}) => {
  return (
    <th className="ant-table-cell">
      <div
        className={[
          staff.TableColumnSorters,
          centerTitle ? "justify-content-center" : null,
        ].join(" ")}
      >
        <span className="table-column-title">{title}</span>
        {isSort ? <TiArrowUnsorted onClick={toggle ? desc : asc} /> : null}
      </div>
    </th>
  );
};

export default TableHead;
