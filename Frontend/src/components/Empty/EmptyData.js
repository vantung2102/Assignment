import React from "react";
import "./empty.scss";

const EmptyData = () => {
  return (
    <div className="container_empty">
      <div className="typewriter">
        <div className="slide">
          <i></i>
        </div>
        <div className="paper"></div>
        <div className="keyboard"></div>
      </div>
    </div>
  );
};

export default EmptyData;
