import React from "react";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import { IconArrowSquareRight } from "../assets/icons";
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
  data,
  stepNumber,
  subTitle,
  labelReady,
  onClick = () => {},
}) => {
  return (
    <div>
      <div className="step-of-steps">{stepNumber}</div>
      <div>
        <span className="step-description-subTitle">{subTitle}</span>
      </div>
      <Container className="section-shadow flex-row">
        {isEmpty(data) === false &&
          data.map((row, ix) => {
            return (
              <div key={`list-${ix}`} className="info-list-instruction">
                <IconArrowSquareRight fill="none" />
                <strong>{row.name} -</strong>
                <span>{row.description}</span>
              </div>
            );
          })}
      </Container>
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
    </div>
  );
};

export default CustomIndicationList;
