import React, { useContext } from "react";
import isNil from "lodash/isNil";
import { Route, Routes } from "react-router-dom";
import ContextLayout from "../../context/contextLayout";
import ComponentGeneralSection from "../../components/componentGeneralSection";
import CustomStepLine from "../../components/customStepLine";
import LoaderApp from "../../components/loaderApp";
import InstructionsVerification from "./subScreens/InstructionsVerification";

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

  if (isNil(config) === false) {
    component = (
      <div className="general-container">
        <ComponentGeneralSection title={step}>
          <span>
            Para iniciar con tu proceso iniciaremos con una verificación de
            identidad, esto nos ayuda a la eliminación de fraudes por
            suplantación de identidad
          </span>
          <CustomStepLine data={config.stepLine}>
            <Routes>
              <Route
                path="instructions"
                element={<InstructionsVerification />}
              />
              {/* <Route path="documentId" element={<CarInformation />} />
              <Route path="documentAddress" element={<Verification />} />
              <Route path="selfie" element={<Verification />} /> */}
            </Routes>
          </CustomStepLine>
        </ComponentGeneralSection>
      </div>
    );
  }

  return component;
};

export default Verification;
