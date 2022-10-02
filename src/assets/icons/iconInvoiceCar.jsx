import React from "react";
import { ReactComponent as InvoiceCar } from "../svg/invoiceCar.svg";

const IconInvoiceCar = (props) => {
  const { fill = "none", color = "#000000", size = "24" } = props;
  return (
    <svg
      width="32"
      height="46"
      viewBox="0 0 32 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.8762 13.2817V41.1734C31.8762 42.2301 31.4564 43.2436 30.7091 43.9909C29.9619 44.7381 28.9484 45.1579 27.8916 45.1579H3.98452C2.92776 45.1579 1.91428 44.7381 1.16704 43.9909C0.419796 43.2436 0 42.2301 0 41.1734V3.98452C0 2.92776 0.419796 1.91428 1.16704 1.16704C1.91428 0.419797 2.92776 0 3.98452 0H18.5944L31.8762 13.2817ZM18.5944 14.6099C18.2422 14.6099 17.9043 14.47 17.6553 14.2209C17.4062 13.9718 17.2663 13.634 17.2663 13.2817V2.65635H3.98452C3.63227 2.65635 3.29444 2.79628 3.04536 3.04536C2.79628 3.29444 2.65635 3.63227 2.65635 3.98452V41.1734C2.65635 41.5256 2.79628 41.8635 3.04536 42.1125C3.29444 42.3616 3.63227 42.5015 3.98452 42.5015H27.8916C28.2439 42.5015 28.5817 42.3616 28.8308 42.1125C29.0799 41.8635 29.2198 41.5256 29.2198 41.1734V14.6099H18.5944ZM19.9226 5.08425L26.7919 11.9536H19.9226V5.08425Z"
        fill={color}
      />
      <path
        d="M24.772 25.156L23.404 21.051C23.2056 20.4535 22.8238 19.9337 22.3131 19.5655C21.8024 19.1973 21.1886 18.9994 20.559 19H11.441C10.8114 18.9994 10.1976 19.1973 9.68688 19.5655C9.17615 19.9337 8.79445 20.4535 8.596 21.051L7.228 25.156C6.86461 25.3085 6.55428 25.5648 6.33584 25.8928C6.11741 26.2208 6.00059 26.6059 6 27V32C6 32.753 6.423 33.402 7.039 33.743C7.026 33.809 7 33.869 7 33.938V36C7 36.2652 7.10536 36.5196 7.29289 36.7071C7.48043 36.8946 7.73478 37 8 37H9C9.26522 37 9.51957 36.8946 9.70711 36.7071C9.89464 36.5196 10 36.2652 10 36V34H22V36C22 36.2652 22.1054 36.5196 22.2929 36.7071C22.4804 36.8946 22.7348 37 23 37H24C24.2652 37 24.5196 36.8946 24.7071 36.7071C24.8946 36.5196 25 36.2652 25 36V33.938C25 33.869 24.974 33.808 24.961 33.743C25.2744 33.5721 25.5362 33.3202 25.7189 33.0136C25.9017 32.707 25.9988 32.357 26 32V27C26 26.171 25.492 25.459 24.772 25.156ZM8 32V27H24L24.002 32H8ZM11.441 21H20.558C20.989 21 21.371 21.274 21.507 21.684L22.613 25H9.387L10.492 21.684C10.5583 21.4848 10.6857 21.3115 10.856 21.1888C11.0264 21.066 11.231 21 11.441 21Z"
        fill={color}
      />
      <path
        d="M10.5 31C11.3284 31 12 30.3284 12 29.5C12 28.6716 11.3284 28 10.5 28C9.67157 28 9 28.6716 9 29.5C9 30.3284 9.67157 31 10.5 31Z"
        fill={color}
      />
      <path
        d="M21.5 31C22.3284 31 23 30.3284 23 29.5C23 28.6716 22.3284 28 21.5 28C20.6716 28 20 28.6716 20 29.5C20 30.3284 20.6716 31 21.5 31Z"
        fill={color}
      />
    </svg>
  );
};

export default IconInvoiceCar;
