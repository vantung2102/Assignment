import React, { useEffect, useState } from "react";
import { Card, Col, Row, Form, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  leaveByUser,
  leaveSelector,
  showLeave,
} from "../../features/leave/leaveSlice";
import { ProfileView } from "../StaffProfile/TopProfile/topProfile";
import { ColumnDetail, ColumnDetailType } from "./ColumnDetail";

const DetailLeave = ({ idRequest, isUser }) => {
  const dispatch = useDispatch();
  const leave = useSelector(leaveSelector);
  const [staff, setStaff] = useState(null);
  const [casual, setCasual] = useState(null);
  const [unpaid, setUnpaid] = useState(null);
  const [compassionate, setCompassionate] = useState(null);
  const [marriage, setMarriage] = useState(null);
  const [paternity, setPaternity] = useState(null);
  const [maternity, setMaternity] = useState(null);
  const [number, setNumber] = useState(null);

  useEffect(() => {
    isUser ? dispatch(leaveByUser(idRequest)) : dispatch(showLeave(idRequest));
  }, [dispatch]);

  useEffect(() => {
    if (!leave) return;
    const {
      staff,
      allowed_number_of_days_off,
      casual_leave,
      unpaid_leave,
      compassionate_leave,
      marriage_leave,
      paternity_leave,
      maternity_leave,
    } = leave?.attributes;

    setStaff(staff?.fullname);
    setCasual(casual_leave);
    setUnpaid(unpaid_leave);
    setCompassionate(compassionate_leave);
    setCompassionate(unpaid_leave);
    setMarriage(marriage_leave);
    setPaternity(paternity_leave);
    setMaternity(maternity_leave);
    setNumber(allowed_number_of_days_off);
  }, [leave]);

  return (
    <Card className="mb-0">
      <Card.Body>
        <Row>
          <Col md={12}>
            <ProfileView>
              <Row>
                <ColumnDetail title="Staff:" value={staff} disabled={true} />
                <ColumnDetailType
                  title="Casual leave:"
                  value={casual}
                  defaultValue={number}
                />
                <ColumnDetailType
                  title="Unpaid leave:"
                  value={unpaid}
                  defaultValue={15}
                />
                <ColumnDetailType
                  title="Marriage leave:"
                  value={marriage}
                  defaultValue={3}
                />
                <ColumnDetailType
                  title="Compassionate leave:"
                  value={compassionate}
                  defaultValue={3}
                />
                <ColumnDetailType
                  title="Paternity leave:"
                  value={paternity}
                  defaultValue={1}
                />
                <ColumnDetailType
                  title="Maternity leave:"
                  value={maternity}
                  defaultValue={6 * 30}
                />
              </Row>
            </ProfileView>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DetailLeave;
