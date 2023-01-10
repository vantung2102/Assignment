import React from "react";
import clsx from "clsx";
import Button from "react-bootstrap/Button";
import { scrollToTop } from "./scroll";
import { FaArrowUp } from "react-icons/fa";

const GoTopButton = ({ visible = true }) => (
  <Button
    className={clsx("back-to-top-btn", { "back-to-top-btn--visible": visible })}
    onClick={scrollToTop}
    variant="dark"
  >
    <FaArrowUp />
  </Button>
);

export default GoTopButton;
