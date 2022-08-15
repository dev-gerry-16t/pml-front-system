import React from "react";
import { ReactComponent as Camera } from "../svg/backCamera.svg";

const IconBackCamera = (props) => {
  const { size = "24" } = props;
  return <Camera width={size} height={size} />;
};

export default IconBackCamera;
