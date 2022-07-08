import React from "react";
import { ReactComponent as Instructions } from "../svg/instructions.svg";

const IconInstructions = (props) => {
  const { fill = "none", color = "#000000", size = "24" } = props;
  return <Instructions stroke={color} fill={fill} width={size} height={size} />;
};

export default IconInstructions;
