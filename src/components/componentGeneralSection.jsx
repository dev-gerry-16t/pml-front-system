import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      duration: 1,
    },
  },
};

const ContainerInfo = styled.div`
  padding: 1em 3em;
  @media screen and (max-width: 420px) {
    padding: 1em 10px;
  }
`;

const GeneralSection = styled.div`
  width: 100%;
  padding: 2em;
  background: var(--color-backGround-section);
  box-shadow: 0px 5px 15px rgba(192, 192, 192, 0.35);
  border-radius: 0.8em;
  box-sizing: border-box;

  .title-section {
    border-bottom: 1px solid var(--color-border-black);
    padding-bottom: 1em;
    h2 {
      margin: 0px;
      color: var(--color-border-black);
      font-family: "Kometa", "Lato";
      font-style: normal;
      font-weight: 700;
      font-size: 1.4em;
    }
  }
  @media screen and (max-width: 420px) {
    padding: 1em 10px;
  }
`;

const ComponentGeneralSection = ({ title = "", children }) => {
  return (
    <GeneralSection variants={container} initial="hidden" animate="show">
      <div className="title-section">
        <h2>{title}</h2>
      </div>
      <ContainerInfo>{children}</ContainerInfo>
    </GeneralSection>
  );
};

export default ComponentGeneralSection;
