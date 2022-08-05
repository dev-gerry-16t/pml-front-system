import React, { useEffect, useState } from "react";
import isNil from "lodash/isNil";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const loadCircle = keyframes`
 0%   { background: #33CCCC; }
  20%  { background: #33CC36; }
  40%  { background: #B8CC33; }
  60%  { background: #FCCA00; }
  80%  { background: #33CC36; }
  100% { background: #33CCCC; }
`;

const Toaster = styled(motion.div)`
  background: ${(props) =>
    isNil(props.background) === false
      ? props.background
      : "var( --color-brand-primary)"};
  position: fixed;
  bottom: 0px;
  width: 100%;
  z-index: 1000;
  .name-message {
    position: relative;
    padding: 1em;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Lato";
    font-size: 1.3em;
    font-weight: 700;
    .button-close {
      position: absolute;
      right: 1em;
      cursor: pointer;
      background: transparent;
      outline: none;
      border: none;
      color #fff
    }
  }
`;

const ButtonHeader = styled.div`
  position: absolute;
  right: 1em;
  cursor: pointer;
  .button-modal {
    width: 3em;
    height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background: conic-gradient(
      rgba(255, 255, 255, 0.4) ${(props) => props.load * 3.6}deg,
      rgba(255, 255, 255, 0.1) ${(props) => props.load * 3.6}deg
    );
    position: relative;
    animation: ${loadCircle} 1s cubic-bezier(0.1, 0.7, 1, 0.1) ease-out;

    .value-container {
    }
  }
  .button-modal::before {
    content: "";
    position: absolute;
    width: 2em;
    height: 2em;
    border-radius: 50%;
  }
`;

const ERROR_COLOR = {
  WARNING: "var(--color-warning-message)",
  SUCCESS: "var(--color-success-message)",
  ERROR: "var(--color-error-message)",
};

let intervalTime;

const ComponentToasterMessage = () => {
  const [isVisibleError, setIsVisibleError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [errorType, setErrorType] = useState("");
  const [timeDisplay, setTimeDisplay] = useState(0);

  const handlerCloseMessage = () => {
    setIsVisibleError(false);
    setErrorMessage("");
    setErrorType("");
    setTimeDisplay(0);
  };
  console.log("timeDisplay", timeDisplay);
  const handlerStartInterval = () => {
    let time = timeDisplay;
    intervalTime = setInterval(() => {
      time++;
      setTimeDisplay(time);
    }, 1000);
  };

  useEffect(() => {
    document.addEventListener("displayMessage", function (e) {
      if (isNil(intervalTime) === false) {
        clearInterval(intervalTime);
      }
      setIsVisibleError(true);
      setErrorMessage(e.detail.message);
      setErrorType(e.detail.type);
      handlerStartInterval();
    });
  }, []);

  useEffect(() => {
    if (timeDisplay >= 11) {
      handlerCloseMessage();
      clearInterval(intervalTime);
    }
  }, [timeDisplay]);

  return (
    <AnimatePresence>
      {isVisibleError === true && (
        <Toaster
          background={ERROR_COLOR[errorType]}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          onHoverEnd={(e) => {
            e.stopPropagation();
            handlerStartInterval();
          }}
          onHoverStart={(e) => {
            e.stopPropagation();
            if (isNil(intervalTime) === false) {
              clearInterval(intervalTime);
            }
          }}
        >
          <div className="name-message">
            <span>{errorMessage}</span>
            <ButtonHeader load={timeDisplay * 10}>
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.8 }}
                className="button-modal"
                onClick={() => {
                  handlerCloseMessage();
                  if (isNil(intervalTime) === false) {
                    clearInterval(intervalTime);
                  }
                }}
              >
                <div className="value-container"></div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path
                    d="M15 5L5 15M5 5l5.03 5.03L15 15"
                    fill="black"
                    stroke-width="2"
                    stroke="white"
                    stroke-linecap="round"
                  ></path>
                </svg>
              </motion.button>
            </ButtonHeader>
          </div>
        </Toaster>
      )}
    </AnimatePresence>
  );
};

export default ComponentToasterMessage;
