import React from "react";
import { ReactComponent as Car } from "../svg/car.svg";

const IconCar = (props) => {
  const { size = "24" } = props;
  return <Car width={size} />;
};

export default IconCar;
