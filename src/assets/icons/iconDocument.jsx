import React from "react";
import { ReactComponent as Document } from "../svg/document.svg";

const IconDocument = (props) => {
  const { fill = "none", color = "#000000", size = "24" } = props;
  return <Document stroke={color} width={size} height={size} />;
};

export default IconDocument;
