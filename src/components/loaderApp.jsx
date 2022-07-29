import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
   0%{
    transform: rotate(0);
  }
  25%{
    transform: rotate(180deg);

  }
  50%{
    transform: rotate(90deg);

  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99999;
  .loader-inner {
    bottom: 0;
    height: 60px;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: 0;
    width: 100px;
    .loader-line-wrap {
      animation: ${spin} 3000ms cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
      box-sizing: border-box;
      height: 50px;
      left: 0;
      overflow: hidden;
      position: absolute;
      top: 0;
      transform-origin: 50% 100%;
      width: 100px;
      .loader-line {
        border: 5px solid transparent;
        border-radius: 100%;
        box-sizing: border-box;
        height: 100px;
        left: 0;
        margin: 0 auto;
        position: absolute;
        right: 0;
        top: 0;
        width: 100px;
      }
    }
    .loader-line-wrap:nth-child(1) {
      animation-delay: -50ms;
      .loader-line {
        border-color: var(--color-brand-primary);
        height: 90px;
        width: 90px;
        top: 7px;
      }
    }
    .loader-line-wrap:nth-child(2) {
      animation-delay: -100ms;
      .loader-line {
        border-color: var(--color-brand-secondary);
        height: 76px;
        width: 76px;
        top: 14px;
      }
    }
    .loader-line-wrap:nth-child(3) {
      animation-delay: -150ms;
      .loader-line {
        border-color: var(--color-brand-primary);
        height: 62px;
        width: 62px;
        top: 21px;
      }
    }
    .loader-line-wrap:nth-child(4) {
      animation-delay: -200ms;
      .loader-line {
        border-color: var(--color-brand-secondary);
        height: 48px;
        width: 48px;
        top: 28px;
      }
    }
    .loader-line-wrap:nth-child(5) {
      animation-delay: -250ms;
      .loader-line {
        border-color: var(--color-brand-primary);
        height: 34px;
        width: 34px;
        top: 35px;
      }
    }
  }
`;

const LoaderApp = () => {
  return (
    <Loader>
      <div className="loader-inner">
        <div className="loader-line-wrap">
          <div className="loader-line" />
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line" />
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line" />
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line" />
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line" />
        </div>
      </div>
    </Loader>
  );
};

export default LoaderApp;
