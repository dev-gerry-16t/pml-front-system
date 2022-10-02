import React from "react";
import { ReactComponent as Logout } from "../svg/logout.svg";

const IconLogout = (props) => {
  const { size = "24" } = props;
  return <Logout width={size} height={size} />;
};

export default IconLogout;