import React, { useState } from "react";
import { TreeNode, NodeTitle, NodeContent } from "./home";
import { FaUserAlt } from "react-icons/fa";
import { AiFillInfoCircle } from "react-icons/ai";
import avatar from "../../assets/images/home/user.jpg";

const Node = ({ nodeData }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <TreeNode>
        <NodeTitle>
          <FaUserAlt className="icon_user" />
          {nodeData.name}
        </NodeTitle>
        <NodeContent>{nodeData.title}</NodeContent>
      </TreeNode>

      <div className="container_info">
        <div className="img_user">
          <img className="avatar" src={avatar} />
        </div>
        <div className="content_user">
          <div className="info_user">
            <h4 className="m-0">Full Name: </h4>
            <span> {nodeData.name}</span>
          </div>
          <div className="info_user">
            <h4 className="mb-0">Position: </h4>
            <span> {nodeData.title}</span>
          </div>
          <div className="info_user">
            <h4 className="m-0">Department: </h4>
            <span> {nodeData.department}</span>
          </div>
          <div className="info_user">
            <h4 className="m-0">Job Title: </h4>
            <span> {nodeData.jobTitle}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Node;
