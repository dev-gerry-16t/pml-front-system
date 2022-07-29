import React, { useEffect, useState } from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ContextStepLine from "../context/contextStepLine";
import {
  IconDocAddress,
  IconDocId,
  IconSelfie,
  IconInstructions,
  IconInvoiceCar,
  IconCarId,
  IconDocument,
  IconCarTenure,
} from "../assets/icons";

const max_width = "820px";

const IconsStep = {
  IconDocAddress,
  IconDocId,
  IconSelfie,
  IconInstructions,
  IconInvoiceCar,
  IconCarId,
  IconDocument,
  IconCarTenure,
};

const PrincipalContainer = styled.div`
  display: grid;
  grid-template-columns: 21em 1fr;
  @media screen and (max-width: ${max_width}) {
    grid-template-columns: 100%;
    grid-template-rows: 7em auto;
  }
`;

const ContainerStep = styled.div`
  display: flex;
  flex-direction: column;
  .line-step:last-child {
    display: none;
  }
  @media screen and (max-width: ${max_width}) {
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
  }
`;

const ComponentStep = styled(motion.div)`
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
    position: relative;
    .line-mobile {
      position: absolute;
      display: none;
      z-index: 0;
      width: 12vw;
      left: 4em;
    }
  }
  .line {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
  }

  @media screen and (max-width: ${max_width}) {
    grid-template-columns: 6em;
    grid-template-rows: 6em auto;
    grid-template-areas:
      "iconStep"
      "description";
    .title-description {
      grid-area: description;
      .title {
        display: none;
      }
      .description {
        display: none;
      }
    }
    .icon-step {
      grid-area: iconStep;
      .line-mobile {
        display: block;
      }
    }

    .line {
      display: none;
    }
  }
`;

const Step = styled.div`
  width: 4.6875em;
  height: 4.6875em;
  border-radius: 50%;
  background: ${(props) =>
    props.background === true
      ? "var(--color-font-primary)"
      : "var(--color-backGround-section)"};
  border: ${(props) => props.border};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  @media screen and (max-width: ${max_width}) {
    width: 3.6875em;
    height: 3.6875em;
    background: ${(props) =>
      props.background === true
        ? "var(--color-font-primary)"
        : "var(--color-backGround-light)"};
  }
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
  @media screen and (max-width: ${max_width}) {
    display: none;
  }
`;

const Line = styled.div`
  width: 1px;
  height: 100%;
  border-left: ${(props) =>
    props.isCompleted === true
      ? "2px solid var(--color-font-primary)"
      : "2px dashed var(--color-font-primary)"};
  position: absolute;
  top: 5em;
  display: ${(props) => (props.isVisible === true ? "block" : "none")};
  @media screen and (max-width: ${max_width}) {
    position: relative;
    width: 18vw;
    border-left: none;
    border-top: ${(props) =>
      props.isCompleted === true
        ? "2px solid var(--color-font-primary)"
        : "2px dashed var(--color-font-primary)"};
    height: 2px;
    left: 0px;
    top: 0px;
  }
`;

const CustomStepLine = ({ children, data }) => {
  const [content, setContent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
                initial={{
                  scale: 0,
                }}
                custom={ix}
                animate={{
                  transition: {
                    delay: ix === 0 ? ix : ix / 2,
                  },
                  scale: 1,
                }}
                onClick={() => {
                  //navigate(row.path);
                }}
              >
                <div className="title-description">
                  <span className="title">{row.name || row.documentType}</span>
                  <span className="description">
                    {row.description || row.directions}
                  </span>
                </div>
                <div className="icon-step">
                  <Step
                    background={
                      row.isCompleted === true || row.isCurrent === true
                    }
                    border={"3px solid var(--color-font-primary)"}
                  >
                    {isNil(IconsStep[row.icon]) === false &&
                      React.createElement(IconsStep[row.icon], {
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
                  <div className="line-mobile">
                    <Line
                      isCompleted={row.isCompleted === true}
                      isVisible={data.length !== ix + 1}
                    />
                  </div>
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
                  <Line
                    isCompleted={row.isCompleted === true}
                    isVisible={data.length !== ix + 1}
                  />
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
