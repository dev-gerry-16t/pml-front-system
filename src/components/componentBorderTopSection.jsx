import React, { Children } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        duration: 0.5,
      },
    },
  };

const GeneralSection = styled(motion.div)`
  width: 100%;
  padding: 2em;
  background: var(--color-backGround-section);
  box-shadow: 0px 5px 15px rgba(35, 50, 153, 0.3);
  border-radius: 0.8em;
  box-sizing: border-box;
  border-top: 10px solid var(--color-brand-primary);
`;

const ComponentBorderTopSection = ({ children }) => {
  return (
    <GeneralSection
      variants={container}
      initial="hidden"
      animate="show"
    >
      {children}
    </GeneralSection>
  );
};

export default ComponentBorderTopSection;
