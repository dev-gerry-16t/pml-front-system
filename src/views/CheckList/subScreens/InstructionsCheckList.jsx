import React, { useContext, useState } from "react";
import isEmpty from "lodash/isEmpty";
import CustomIndicationList from "../../../components/customIndicationList";
import ContextLayout from "../../../context/contextLayout";
import ContextStepLine from "../../../context/contextStepLine";
import ComponentInstruction from "../../../components/componentInstruction";
import LoaderApp from "../../../components/loaderApp";
import ComponentQrScan from "../../../components/componentQrScan";

const InstructionsCheckList = () => {
  const dataContextLayout = useContext(ContextLayout);
  const {
    dataConfigStep: { idStep },
    idPawn,
    setPipeLine,
    getPipeLine,
    dataProfile,
  } = dataContextLayout;
  const dataContent = useContext(ContextStepLine);
  const {
    content: { content, idStepLine },
  } = dataContent;
  const [nextStep, setNextStep] = useState(false);

  let component = <LoaderApp />;

  if (nextStep === false) {
    component = (
      <div className="section-center">
        <CustomIndicationList
          stepNumber="Paso 1 de 4"
          subTitle=""
          labelReady="Tengo listo todos los documentos"
          isVisibleButton
          onClick={async () => {
            try {
              await setPipeLine(
                {
                  idStep,
                  idStepLine,
                },
                idPawn
              );
              if (window.mobileCheck()) {
                await getPipeLine();
              } else {
                setNextStep(true);
              }
            } catch (error) {}
          }}
        >
          {isEmpty(content) === false &&
            content.map((row, ix) => {
              return <ComponentInstruction key={`list-${ix}`} row={row} />;
            })}
        </CustomIndicationList>
      </div>
    );
  }
  if (nextStep === true) {
    component = (
      <div className="section-center">
        <CustomIndicationList
          stepNumber="Paso 1 de 4"
          subTitle="Escanea el QR  y realiza el proceso desde tu dispositivo móvil"
          labelReady=""
          isVisibleButton={false}
          onClick={() => {}}
        >
          <ComponentQrScan
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${window.location.origin}?token=${dataProfile.token}&amp;size=200x200`}
          />
        </CustomIndicationList>
      </div>
    );
  }

  return component;
};

export default InstructionsCheckList;
