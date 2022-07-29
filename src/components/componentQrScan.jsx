import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "react-lottie";
import animationData from "../assets/lottie/kiss-of-the-heart.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const CodeQrSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em 0px;
  .square {
    position: absolute;
    width: 4em;
    height: 4em;
    background: var(--color-font-primary);
    z-index: 0;
  }
  .square-1 {
    top: -0.5em;
    left: -0.5em;
  }
  .square-2 {
    top: -0.5em;
    right: -0.5em;
  }
  .square-3 {
    bottom: -0.5em;
    left: -0.5em;
  }
  .square-4 {
    bottom: -0.5em;
    right: -0.5em;
  }
  .qr-code-section {
    padding: 0.3em;
    position: relative;
    z-index: 1;
    background: var(--color-backGround-section);
  }
`;

const ComponentQrScan = ({ src }) => {
  const [isVisibleQr, setIsVisibleQr] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisibleQr(true);
    }, 5500);
  }, []);

  return (
    <CodeQrSection>
      <AnimatePresence>
        {isVisibleQr === true && (
          <motion.div
            initial={{
              scale: 0,
              display: "none",
            }}
            animate={{
              scale: 1,
              transition: {
                delay: 1,
              },
              display: "block",
            }}
            exit={{
              scale: 0,
            }}
            style={{
              position: "relative",
            }}
          >
            <div className="square square-1"></div>
            <div className="square square-2"></div>
            <div className="square square-3"></div>
            <div className="square square-4"></div>
            <div className="qr-code-section">
              <img
                id="qr-code-pml"
                src={src}
                alt=""
                title="Qr-code"
                width="300"
                height="300"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isVisibleQr === false && (
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            exit={{
              scale: 0,
            }}
          >
            <Lottie options={defaultOptions} height={300} width={300} />
          </motion.div>
        )}
      </AnimatePresence>
    </CodeQrSection>
  );
};

export default ComponentQrScan;
