import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateStaffActivation } from "../../../features/staff/staffSlice.js";
import { ButtonToggleSwitch } from "./ToggleSwitch.jsx";
import "./toggleSwitch.scss";

const ToggleSwitch = ({ id, profile }) => {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(true);

  const handleChangeStatus = () => {
    dispatch(
      updateStaffActivation({
        id: id,
        status: profile?.attributes.status === "active" ? "inactive" : "active",
      })
    );
  };

  useEffect(() => {
    if (!profile) return;

    if (profile?.attributes.status === "active") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [profile]);

  return (
    <ButtonToggleSwitch htmlFor="toggle">
      <input
        id="toggle"
        type="checkbox"
        checked={checked}
        onChange={handleChangeStatus}
      />
      <span className="slider"></span>
    </ButtonToggleSwitch>
  );
};

export default ToggleSwitch;
