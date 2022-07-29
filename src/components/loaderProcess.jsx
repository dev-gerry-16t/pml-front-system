import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0%{
    stroke: #233299;
  }
  50%{

      stroke:#00D0B0;
  }
  100%{
    stroke: #233299;

  }
`;

const seconds = "800ms";

const FullScreen = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SVG = styled.svg`
  path {
    stroke: #00d0b0;
  }
  #vector-1 {
    path {
      animation: ${spin} ${seconds} calc((${seconds} / 12) * 1) infinite;
    }
  }
  #vector-2 {
    path {
      animation: ${spin} ${seconds} calc((${seconds} / 12) * 2) infinite;
    }
  }
  #vector-3 {
    path {
      animation: ${spin} ${seconds} calc((${seconds} / 12) * 3) infinite;
    }
  }
  #vector-4 {
    path {
      animation: ${spin} ${seconds} calc((${seconds} / 12) * 4) infinite;
    }
  }
  #vector-5 {
    path {
      animation: ${spin} ${seconds} calc((${seconds} / 12) * 5) infinite;
    }
  }
  #vector-6 {
    path {
      animation: ${spin} ${seconds} calc((${seconds} / 12) * 6) infinite;
    }
  }
  #vector-7 {
    path {
      animation: ${spin} ${seconds} calc((${seconds} / 12) * 7) infinite;
    }
  }
  #vector-8 {
    path {
      animation: ${spin} ${seconds} calc((${seconds} / 12) * 8) infinite;
    }
  }
  #vector-9 {
    path {
      animation: ${spin} ${seconds} calc((${seconds} / 12) * 9) infinite;
    }
  }
  #vector-10 {
    path {
      animation: ${spin} ${seconds} calc((${seconds} / 12) * 10) infinite;
    }
  }
  #vector-11 {
    path {
      animation: ${spin} ${seconds} calc((${seconds} / 12) * 11) infinite;
    }
  }
  #vector-12 {
    path {
      animation: ${spin} ${seconds} calc((${seconds} / 12) * 12) infinite;
    }
  }
`;

const LoaderProcess = () => {
  return (
    <FullScreen>
      <SVG
        width={142}
        height={142}
        viewBox="0 0 142 142"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Loader">
          <g id="vector-1">
            <path
              id="Vector"
              d="M71 4V17.4"
              stroke="#233299"
              strokeWidth={8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <g id="vector-2">
            <path
              id="Vector_2"
              d="M104.5 12.9771L97.7998 24.5817"
              stroke="#233299"
              strokeWidth={8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <g id="vector-3">
            <path
              id="Vector_3"
              d="M129.024 37.5L117.419 44.2"
              stroke="#233299"
              strokeWidth={8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <g id="vector-4">
            <path
              id="Vector_4"
              d="M138 71H124.6"
              stroke="#233299"
              strokeWidth={8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <g id="vector-5">
            <path
              id="Vector_5"
              d="M129.024 104.5L117.419 97.7998"
              stroke="url(#paint0_linear_245_1326)"
              strokeWidth={8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <g id="vector-6">
            <path
              id="Vector_6"
              d="M104.5 129.024L97.7998 117.419"
              stroke="url(#paint1_linear_245_1326)"
              strokeWidth={8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <g id="vector-7">
            <path
              id="Vector_7"
              d="M71 138V124.6"
              stroke="url(#paint2_linear_245_1326)"
              strokeWidth={8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <g id="vector-8">
            <path
              id="Vector_8"
              d="M37.5 129.024L44.2 117.419"
              stroke="url(#paint3_linear_245_1326)"
              strokeWidth={8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <g id="vector-9">
            <path
              id="Vector_9"
              d="M12.9751 104.5L24.5797 97.7998"
              stroke="#00D0B0"
              strokeWidth={8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <g id="vector-10">
            <path
              id="Vector_10"
              d="M4 71H17.4"
              stroke="#00D0B0"
              strokeWidth={8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <g id="vector-11">
            <path
              id="Vector_11"
              d="M12.9751 37.5L24.5797 44.2"
              stroke="#00D0B0"
              strokeWidth={8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <g id="vector-12">
            <path
              id="Vector_12"
              d="M37.5 12.9771L44.2 24.5817"
              stroke="#00D0B0"
              strokeWidth={8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_245_1326"
            x1="123.221"
            y1="97.7998"
            x2="123.221"
            y2="104.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#233299" />
            <stop offset={1} stopColor="#00D0B0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_245_1326"
            x1="101.15"
            y1="117.419"
            x2="101.15"
            y2="129.024"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#233299" />
            <stop offset={1} stopColor="#00D0B0" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_245_1326"
            x1="71.5"
            y1="124.6"
            x2="71.5"
            y2={138}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#233299" />
            <stop offset={1} stopColor="#00D0B0" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_245_1326"
            x1="40.85"
            y1="117.419"
            x2="40.85"
            y2="129.024"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#233299" />
            <stop offset={1} stopColor="#00D0B0" />
          </linearGradient>
        </defs>
      </SVG>
    </FullScreen>
  );
};

export default LoaderProcess;
