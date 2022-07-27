import React from "react";
import { ReactComponent as InvoiceCar } from "../svg/invoiceCar.svg";

const IconInvoiceCar = (props) => {
  const { fill = "none", color = "#000000", size = "24" } = props;
  return <InvoiceCar stroke={fill} fill={color} width={size} height={size} />;
};

export default IconInvoiceCar;