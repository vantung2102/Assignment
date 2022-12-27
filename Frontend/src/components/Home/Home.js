import React, { useEffect } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStaffChart,
  staffChartSelector,
} from "../../features/staff/staffSlice";
import Node from "./Node";
import "./home.scss";

const Home = () => {
  const dispatch = useDispatch();
  const staffList = useSelector(staffChartSelector);

  useEffect(() => {
    dispatch(fetchStaffChart());
  }, []);

  const dataOrg = (arr) => {
    return arr?.map((staff) => {
      return {
        id: staff.id,
        name: staff.attributes.fullname,
        title: staff.attributes.position.name,
        department: staff.attributes.department.name,
        jobTitle: staff.attributes.job_title.title,
        parent_id: staff.attributes.upper_level
          ? staff.attributes.upper_level.id
          : null,
      };
    });
  };

  const nest = (items, id = null, link = "parent_id") =>
    items
      ?.filter((item) => item[link] == id)
      .map((item) => ({ ...item, children: nest(items, item.id) }));

  return (
    <>
      {staffList ? (
        <OrganizationChart
          datasource={nest(dataOrg(staffList))[0]}
          pan={true}
          NodeTemplate={Node}
          zoom={true}
        />
      ) : null}
    </>
  );
};

export default Home;
