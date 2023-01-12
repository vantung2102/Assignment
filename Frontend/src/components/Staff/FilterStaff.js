import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { optionSelect2 } from "../../common/hooks/hooks";
import Select from "react-select";
import { allPositionSelector } from "../../features/position/positionSlice";
import { allDepartmentSelector } from "../../features/department/departmentSlice";
import { allJobTitleSelector } from "../../features/jobTitle/jobTitleSlice";
import { useDispatch, useSelector } from "react-redux";
import { filterStaff } from "../../features/staff/staffSlice";

const FilterStaff = () => {
  const dispatch = useDispatch();

  const positions = useSelector(allPositionSelector);
  const departments = useSelector(allDepartmentSelector);
  const jobTitles = useSelector(allJobTitleSelector);

  const [name, setName] = useState("");
  const [department, setDepartment] = useState(null);
  const [position, setPosition] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);

  const handleFilter = () => {
    const data = {
      fullname: name,
      position: position,
      department: department,
      job_title: jobTitle,
    };

    dispatch(filterStaff(data));
  };

  return (
    <Row className="mb-4">
      <Col lg={2} md={6} sm={6} className="mt-2">
        <Form.Control
          placeholder="Employee Name"
          onChange={(e) => setName(e.target.value)}
        />
      </Col>

      <Col lg={3} md={6} sm={6} className="mt-2">
        <Select
          options={optionSelect2(departments, "name")}
          placeholder="Select Departments"
          onChange={(e) => setDepartment(e.value)}
        />
      </Col>

      <Col lg={3} md={6} sm={6} className="mt-2">
        <Select
          options={optionSelect2(positions, "name")}
          placeholder="Select Positions"
          onChange={(e) => setPosition(e.value)}
        />
      </Col>

      <Col lg={3} md={6} sm={6} className="mt-2">
        <Select
          options={optionSelect2(jobTitles, "title")}
          placeholder="Select Job Title"
          onChange={(e) => setJobTitle(e.value)}
        />
      </Col>

      <Col lg={1} md={6} sm={6} className="mt-2">
        <Button variant="success" onClick={handleFilter}>
          Search
        </Button>
      </Col>
    </Row>
  );
};

export default FilterStaff;
