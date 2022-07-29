import React from "react";
import { ReactComponent as CarTenure } from "../svg/tenure.svg";

const IconCarTenure = (props) => {
  const { fill = "none", color = "#000000", size = "24" } = props;
  return <CarTenure stroke={color} width={size} height={size} />;
};

export default IconCarTenure;
