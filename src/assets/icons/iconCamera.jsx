import React from "react";
import { ReactComponent as Camera } from "../svg/camera.svg";

const IconCamera = (props) => {
  const { size = "24" } = props;
  return <Camera width={size} height={size} />;
};

export default IconCamera;
