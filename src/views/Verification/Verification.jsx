import React, { useContext } from "react";
import isNil from "lodash/isNil";
import { Route, Routes } from "react-router-dom";
import ContextLayout from "../../context/contextLayout";
import ComponentGeneralSection from "../../components/componentGeneralSection";
import CustomStepLine from "../../components/customStepLine";
import LoaderApp from "../../components/loaderApp";
import InstructionsVerification from "./subScreens/InstructionsVerification";
import DocumentId from "./subScreens/DocumentId";

const Verification = (props) => {
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
          >
            <span>
              Para iniciar con tu proceso iniciaremos con una verificación de
              identidad, esto nos ayuda a la eliminación de fraudes por
              suplantación de identidad
            </span>
          </div>
          <CustomStepLine data={config.stepLine}>
            <Routes>
              <Route
                path="instructions"
                element={<InstructionsVerification />}
              />
              <Route path="documentId" element={<DocumentId />} />
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
            <Route path="instructions" element={<InstructionsVerification />} />
            <Route path="documentId" element={<DocumentId />} />
          </Routes>
        </CustomStepLine>
      </div>
    );
  }

  return component;
};

export default Verification;
