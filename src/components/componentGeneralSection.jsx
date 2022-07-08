import React, { Children } from "react";
import styled from "styled-components";

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
      font-family: "Kometa";
      font-style: normal;
      font-weight: 700;
      font-size: 1.4em;
    }
  }
`;

const ComponentGeneralSection = ({ title = "", children }) => {
  return (
    <GeneralSection>
      <div className="title-section">
        <h2>{title}</h2>
      </div>
      {children}
    </GeneralSection>
  );
};

export default ComponentGeneralSection;
