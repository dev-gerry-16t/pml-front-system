import React from "react";
import { ReactComponent as Selfie } from "../svg/selfie.svg";

const IconSelfie = (props) => {
  const { fill = "none", color = "#000000", size = "24" } = props;
  return <Selfie stroke={color} fill={fill} width={size} height={size} />;
};

export default IconSelfie;
