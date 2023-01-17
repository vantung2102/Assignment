import React, { useState } from "react";
import "./exportChart.scss";

const ExportChart = ({ orgChart }) => {
  const exportTo = () => {
    orgChart.current.exportTo(filename, "pdf");
  };

  const [filename, setFilename] = useState("organization_chart");

  const onNameChange = (event) => {
    setFilename(event.target.value);
  };

  return (
    <section className="toolbar">
      <label htmlFor="txt-filename">Filename:</label>
      <input
        id="txt-filename"
        type="text"
        value={filename}
        onChange={onNameChange}
        style={{ fontSize: "1rem", marginRight: "2rem" }}
      />

      <button onClick={exportTo} style={{ marginLeft: "2rem" }}>
        Export
      </button>
    </section>
  );
};

export default ExportChart;
