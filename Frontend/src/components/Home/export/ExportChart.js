import React, { useState } from "react";
import "./exportChart.scss";

const ExportChart = ({ orgChart }) => {
  const exportTo = () => {
    orgChart.current.exportTo(filename, fileExtension);
  };

  const [filename, setFilename] = useState("organization_chart");
  const [fileExtension, setFileExtension] = useState("png");

  const onNameChange = (event) => {
    setFilename(event.target.value);
  };

  const onExtensionChange = (event) => {
    setFileExtension(event.target.value);
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
      <span>FileExtension: </span>
      <input
        id="rd-png"
        type="radio"
        value="png"
        checked={fileExtension === "png"}
        onChange={onExtensionChange}
      />
      <label htmlFor="rd-png">png</label>
      <input
        style={{ marginLeft: "1rem" }}
        id="rd-pdf"
        type="radio"
        value="pdf"
        checked={fileExtension === "pdf"}
        onChange={onExtensionChange}
      />
      <label htmlFor="rd-pdf">pdf</label>
      <button onClick={exportTo} style={{ marginLeft: "2rem" }}>
        Export
      </button>
    </section>
  );
};

export default ExportChart;
