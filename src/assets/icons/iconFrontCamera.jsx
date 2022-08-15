import React from "react";
import { ReactComponent as Camera } from "../svg/frontCamera.svg";

const IconFrontCamera = (props) => {
  const { size = "24" } = props;
  return <Camera width={size} height={size} />;
};

export default IconFrontCamera;
