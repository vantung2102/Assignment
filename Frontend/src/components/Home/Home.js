import React, { useEffect, useRef } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import { useDispatch, useSelector } from "react-redux";
import {
  allStaffSelector,
  fetchAllStaff,
} from "../../features/staff/staffSlice";
import Node from "./Node";
import "./home.scss";
import ExportChart from "./export/ExportChart";

const Home = () => {
  const dispatch = useDispatch();
  const orgChart = useRef();

  const staffList = useSelector(allStaffSelector);

  useEffect(() => {
    dispatch(fetchAllStaff());
  }, [dispatch]);

  const dataOrg = (arr) => {
    return arr?.map((staff) => {
      const { id, fullname, position, department, job_title, upper_level } =
        staff.attributes;
      return {
        id: id,
        name: fullname,
        title: position ? position.name : null,
        department: department ? department.name : null,
        jobTitle: job_title ? job_title.title : null,
        parent_id: upper_level ? upper_level.id : null,
      };
    });
  };

  const nest = (items, id = null, link = "parent_id") =>
    items
      ?.filter((item) => item[link] === id)
      .map((item) => ({ ...item, children: nest(items, item.id) }));

  return (
    <>
      <ExportChart orgChart={orgChart} />
      {staffList && (
        <OrganizationChart
          datasource={nest(dataOrg(staffList))[0]}
          pan={true}
          NodeTemplate={Node}
          zoom={true}
          ref={orgChart}
        />
      )}
    </>
  );
};

export default Home;
