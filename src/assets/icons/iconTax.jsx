import React from "react";
import { ReactComponent as Document } from "../svg/iconTax.svg";

const IconTax = (props) => {
  const { fill = "none", color = "#000000", size = "24" } = props;
  return <Document stroke={color} width={size} height={size} />;
};

export default IconTax;
