import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  getRoleSelector,
  getUserSelector,
} from "../../../features/auth/authSlice";

import { profileSelector } from "../../../features/staff/staffSlice";
import PersonalInfoItem from "./PersonalInfoItem";

import { PersonalInfo } from "./profile";
const Profile = () => {
  const role = useSelector(getRoleSelector);
  const profile = useSelector(!role ? getUserSelector : profileSelector);

  const [name, setName] = useState(null);
  const [position, setPosition] = useState(null);
  const [department, setDepartment] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
  const [email, setEmail] = useState(null);
  const [date, setDate] = useState(null);
  const [boss, setBoss] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [joinDate, setJoinDate] = useState(null);

  useEffect(() => {
    if (!profile) return;
    const {
      fullname,
      date_of_birth,
      position,
      department,
      job_title,
      upper_level,
      address,
      join_date,
      phone,
      email,
    } = profile.attributes;

    setName(fullname);
    setEmail(email);
    setJobTitle(job_title?.title);
    setDepartment(department?.name);
    setPosition(position?.name);
    setDate(date_of_birth);
    setBoss(upper_level?.fullname);
    setPhone(phone);
    setAddress(address);
    setJoinDate(join_date);
  }, [profile]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Information Basic</Card.Title>
        <PersonalInfo>
          <PersonalInfoItem title="Full Name" value={name} />
          <PersonalInfoItem title="English Name" value={name} />
          <PersonalInfoItem title="Date of birth" value={date} />
          <PersonalInfoItem title="Join Date" value={joinDate} />
          <PersonalInfoItem title="Position" value={position} />
          <PersonalInfoItem title="Department" value={department} />
          <PersonalInfoItem title="Job Title" value={jobTitle} />
          <PersonalInfoItem title="Manager" value={boss} />
        </PersonalInfo>

        <Card.Title>Contact</Card.Title>
        <PersonalInfo>
          <PersonalInfoItem title="Email" value={email} />
          <PersonalInfoItem title="Company Email" value={email} />
          <PersonalInfoItem title="Phone" value={phone} />
          <PersonalInfoItem title="Address" value={address} />
        </PersonalInfo>
      </Card.Body>
    </Card>
  );
};

export default Profile;
