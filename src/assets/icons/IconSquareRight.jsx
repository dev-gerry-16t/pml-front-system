import React from "react";
import { ReactComponent as IconRight } from "../svg/arrowSquareRight.svg";

const IconArrowSquareRight = (props) => {
  const { fill = "#000", color = "#000000", size = "24px" } = props;
  return <IconRight stroke={color} fill={fill} width={size} height={size} />;
};

export default IconArrowSquareRight;
