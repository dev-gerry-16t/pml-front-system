import isNil from "lodash/isNil";
import React from "react";
import styled from "styled-components";
import CustomButton from "./customButton";

const Container = styled.div`
  padding: 1em 2em;
  margin: 1em 0px 2em 0px;
  row-gap: 1em;
  .info-list-instruction {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    column-gap: 0.2em;
  }
`;

const CustomIndicationList = ({
  stepNumber,
  subTitle,
  labelReady,
  children,
  onClick = () => {},
  isVisibleButton = false,
  buttonComponent = null,
  title,
}) => {
  return (
    <div>
      <h1 className="title-responsive-mobile">{title}</h1>
      <div className="step-of-steps">{stepNumber}</div>
      <div>
        <span className="step-description-subTitle">{subTitle}</span>
      </div>
      <Container className="section-shadow flex-row">{children}</Container>
      {isNil(buttonComponent) === false && buttonComponent}
      {isVisibleButton === true && (
        <div className="alignButton">
          <CustomButton
            formatType="secondary"
            style={{
              padding: "0.5em",
              width: "100%",
            }}
            onClick={onClick}
          >
            {labelReady}
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default CustomIndicationList;
