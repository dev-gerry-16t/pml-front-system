import React from "react";
import { ReactComponent as Document } from "../svg/iconRecomend.svg";

const IconRecomend = (props) => {
  const { fill = "none", color = "#000000", size = "24" } = props;
  return <Document stroke={color} width={size} height={size} />;
};

export default IconRecomend;
