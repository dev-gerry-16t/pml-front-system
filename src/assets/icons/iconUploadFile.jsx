import React from "react";
import { ReactComponent as UploadFile } from "../svg/uploadFile.svg";

const IconUploadFile = (props) => {
  const { size = "24" } = props;
  return <UploadFile width={size} />;
};

export default IconUploadFile;