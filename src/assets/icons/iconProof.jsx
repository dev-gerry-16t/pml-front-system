import React from "react";
import { ReactComponent as Document } from "../svg/iconProof.svg";

const IconProof = (props) => {
  const { fill = "none", color = "#000000", size = "24" } = props;
  return <Document stroke={color} width={size} height={size} />;
};

export default IconProof;
