import React, { useContext } from "react";
import CustomIndicationList from "../../../components/customIndicationList";
import ContextLayout from "../../../context/contextLayout";
import ContextStepLine from "../../../context/contextStepLine";

const InstructionsVerification = () => {
  const dataContextLayout = useContext(ContextLayout);
  const {
    dataConfigStep: { idStep },
    idPawn,
    setPipeLine,
  } = dataContextLayout;
  const dataContent = useContext(ContextStepLine);
  const {
    content: { content, idStepLine },
  } = dataContent;
  
  return (
    <div className="section-center">
      <CustomIndicationList
        data={content}
        stepNumber="Paso 1 de 4"
        subTitle="Para la verificación de identidad necesitamos lo siguiente"
        labelReady="Tengo listo todos los documentos"
        onClick={async () => {
          try {
            await setPipeLine(
              {
                idStep,
                idStepLine,
              },
              idPawn
            );
          } catch (error) {}
        }}
      />
    </div>
  );
};

export default InstructionsVerification;
