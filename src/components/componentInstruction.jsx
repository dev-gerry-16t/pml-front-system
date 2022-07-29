import React from "react";
import { IconArrowSquareRight } from "../assets/icons";

const ComponentInstruction = ({ row }) => {
  return (
    <div className="info-list-instruction">
      <IconArrowSquareRight fill="none" />
      <strong>{row.name} -</strong>
      <span>{row.description}</span>
    </div>
  );
};

export default ComponentInstruction;
