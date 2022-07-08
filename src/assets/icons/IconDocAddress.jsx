import React from "react";
import { ReactComponent as DocAddress } from "../svg/docAddress.svg";

const IconDocAddress = (props) => {
  const { fill = "none", color = "#000000", size = "24" } = props;
  return <DocAddress stroke={fill} fill={color} width={size} height={size} />;
};

export default IconDocAddress;
