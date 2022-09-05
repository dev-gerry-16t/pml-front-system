import React from "react";

const IconWaiting = (props) => {
  const { fill = "none", color = "#000000", size = "24" } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.2498 10.0005C19.2498 15.1095 15.1088 19.2505 9.99979 19.2505C4.89079 19.2505 0.749786 15.1095 0.749786 10.0005C0.749786 4.89149 4.89079 0.750488 9.99979 0.750488C15.1088 0.750488 19.2498 4.89149 19.2498 10.0005Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.4314 12.9429L9.66138 10.6939V5.84692"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconWaiting;
