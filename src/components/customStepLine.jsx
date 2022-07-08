import React, { useEffect, useState } from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ContextStepLine from "../context/contextStepLine";
import {
  IconDocAddress,
  IconDocId,
  IconSelfie,
  IconInstructions,
} from "../assets/icons";
const IconsStep = {
  IconDocAddress,
  IconDocId,
  IconSelfie,
  IconInstructions,
};

const PrincipalContainer = styled.div`
  display: grid;
  grid-template-columns: 21em 1fr;
`;

const ContainerStep = styled.div`
  display: flex;
  flex-direction: column;
  .line-step:last-child {
    display: none;
  }
`;

const ComponentStep = styled.div`
  display: grid;
  grid-template-columns: 12em 6em 2em;
  min-height: 10em;
  cursor: pointer;
  .title-description {
    display: flex;
    flex-direction: column;
    text-align: end;
    justify-content: center;
    .title {
      color: var(--color-font-primary);
      font-weight: 600;
      font-size: 1.2em;
    }
    .description {
      color: var(--color-font-normal);
      font-weight: 400;
    }
  }
  .icon-step {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .line {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
  }
`;

const Step = styled.div`
  width: 4.6875em;
  height: 4.6875em;
  border-radius: 50%;
  background: ${(props) => props.background};
  border: ${(props) => props.border};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Point = styled.div`
  position: relative;
  width: 1.1em;
  height: 1.1em;
  border-radius: 50%;
  background: gray;
  z-index: 1;
  background: ${(props) => props.background};
  border: ${(props) => props.border};
`;

const Line = styled.div`
  width: 1px;
  height: 100%;
  border-left: 2px dashed var(--color-font-primary);
  position: absolute;
  top: 5em;
  display: ${(props) => (props.isVisible === true ? "block" : "none")};
`;

const CustomStepLine = ({ children, data }) => {
  const [content, setContent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("data", data);
    if (isNil(data) === false && isEmpty(data) === false) {
      const findCurrentScreen = data.find((rowFind) => {
        return rowFind.isCompleted === false && rowFind.isCurrent === true;
      });
      if (isNil(findCurrentScreen) === false) {
        navigate(findCurrentScreen.path);
        setContent(isNil(findCurrentScreen) === false ? findCurrentScreen : []);
      }
    }
  }, [data]);

  return (
    <PrincipalContainer>
      <div>
        <ContainerStep>
          {data.map((row, ix) => {
            return (
              <ComponentStep
                key={`stepLine-${ix}`}
                onClick={() => {
                  //navigate(row.path);
                }}
              >
                <div className="title-description">
                  <span className="title">{row.name}</span>
                  <span className="description">{row.description}</span>
                </div>
                <div className="icon-step">
                  <Step
                    background={
                      row.isCompleted === true || row.isCurrent === true
                        ? "var(--color-font-primary)"
                        : "transparent"
                    }
                    border={"3px solid var(--color-font-primary)"}
                  >
                    {React.createElement(IconsStep[row.icon], {
                      size: "2.5em",
                      fill:
                        row.isCompleted === true || row.isCurrent === true
                          ? "var(--color-backGround-section)"
                          : "none",
                      color:
                        row.isCompleted === true || row.isCurrent === true
                          ? "var(--color-backGround-section)"
                          : "var(--color-font-primary)",
                    })}
                  </Step>
                </div>
                <div className="line">
                  <Point
                    background={
                      row.isCompleted === true || row.isCurrent === true
                        ? "var(--color-brand-secondary)"
                        : "var(--color-backGround-section)"
                    }
                    border={
                      row.isCurrent === true
                        ? "1px solid var(--color-brand-secondary)"
                        : "1px solid var(--color-font-primary)"
                    }
                  />
                  <Line isVisible={data.length !== ix + 1} />
                </div>
              </ComponentStep>
            );
          })}
        </ContainerStep>
      </div>
      <ContextStepLine.Provider
        value={{
          content,
        }}
      >
        {children}
      </ContextStepLine.Provider>
    </PrincipalContainer>
  );
};

export default CustomStepLine;
