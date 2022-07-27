import React from "react";
import { ReactComponent as CarId } from "../svg/carId.svg";

const IconCarId = (props) => {
  const { fill = "none", color = "#000000", size = "24" } = props;
  return <CarId stroke={fill} width={size} height={size} />;
};

export default IconCarId;
