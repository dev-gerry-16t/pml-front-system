import React from "react";

const IconDate = (props) => {
  const { fill = "none", color = "#000000", size = "24" } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 43 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.2 5.90039H9.8C5.49218 5.90039 2 9.39257 2 13.7004V33.2004C2 37.5082 5.49218 41.0004 9.8 41.0004H33.2C37.5078 41.0004 41 37.5082 41 33.2004V13.7004C41 9.39257 37.5078 5.90039 33.2 5.90039Z"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 17.6H41M13.7 2V9.8V2ZM29.3 2V9.8V2Z"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconDate;
