import React from "react";
import { ReactComponent as DocId } from "../svg/id.svg";

const IconDocId = (props) => {
  const { fill = "none", color = "#000000", size = "24" } = props;
  return <DocId stroke={color} fill={fill} width={size} height={size} />;
};

export default IconDocId;
