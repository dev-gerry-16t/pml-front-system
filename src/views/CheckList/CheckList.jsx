import React, { useContext } from "react";
import isNil from "lodash/isNil";
import { Route, Routes } from "react-router-dom";
import ContextLayout from "../../context/contextLayout";
import ComponentGeneralSection from "../../components/componentGeneralSection";
import CustomStepLine from "../../components/customStepLine";
import LoaderApp from "../../components/loaderApp";
import InstructionsCheckList from "./subScreens/InstructionsCheckList";
import DocumentTypeCheckList from "./subScreens/DocumentTypeCheckList";

const CheckList = (props) => {
  const dataContextLayout = useContext(ContextLayout);
  const {
    dataConfigStep: { config, idStep, step },
    getPipeLine,
    setPipeLine,
    idPawn,
    idItem,
  } = dataContextLayout;

  let component = <LoaderApp />;

  if (isNil(config) === false && window.mobileCheck() === false) {
    component = (
      <div className="general-container">
        <ComponentGeneralSection title={step}>
          <div
            style={{
              marginTop: "1em",
              fontSize: "1.2em",
              color: "var(--color-font-black)",
            }}
          ></div>
          <CustomStepLine data={config.stepLine}>
            <Routes>
              <Route path="instructions" element={<InstructionsCheckList />} />
              <Route
                path=":documentTypeName"
                element={<DocumentTypeCheckList />}
              />
            </Routes>
          </CustomStepLine>
        </ComponentGeneralSection>
      </div>
    );
  }
  if (isNil(config) === false && window.mobileCheck() === true) {
    component = (
      <div className="general-container">
        <CustomStepLine data={config.stepLine}>
          <Routes>
            <Route path="instructions" element={<InstructionsCheckList />} />
            <Route
              path=":documentTypeName"
              element={<DocumentTypeCheckList />}
            />
          </Routes>
        </CustomStepLine>
      </div>
    );
  }

  return component;
};

export default CheckList;
