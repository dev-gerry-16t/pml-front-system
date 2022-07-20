import React from "react";
import CustomButton from "./customButton";
import CustomIndicationList from "./customIndicationList";

const ComponentProcessDocument = (props) => {
  const { children = <></>, onClickOpenCamera, stepNumber, subTitle } = props;

  return (
    <div className="section-shadow padding-2-1">
      <CustomIndicationList
        stepNumber={stepNumber}
        subTitle={subTitle}
        isVisibleButton={false}
        onClick={async () => {}}
      >
        {children}
        <div
          className="align-button"
          style={{
            padding: "3em 0px",
          }}
        >
          <CustomButton
            style={{
              padding: "0.5em 2em",
            }}
            onClick={onClickOpenCamera}
          >
            Tomar foto
          </CustomButton>
        </div>
      </CustomIndicationList>
    </div>
  );
};

export default ComponentProcessDocument;
