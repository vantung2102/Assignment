import { Popconfirm } from "antd";
import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";

const ActionColumn = ({ id, edit, destroy }) => {
  return (
    <div className="d-flex justify-content-evenly">
      <TbEdit onClick={() => edit(id)} />
      <Popconfirm
        title="Are you sure?"
        onConfirm={() => destroy(id)}
        okText="Yes"
        cancelText="No"
      >
        <RiDeleteBinLine />
      </Popconfirm>
    </div>
  );
};

export default ActionColumn;
