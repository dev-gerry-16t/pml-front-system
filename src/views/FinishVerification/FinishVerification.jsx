import React, { useContext } from "react";
import styled from "styled-components";
import ComponentBorderTopSection from "../../components/componentBorderTopSection";
import ComponentGeneralSection from "../../components/componentGeneralSection";
import CustomButton from "../../components/customButton";
import ContextLayout from "../../context/contextLayout";
import { IconCar } from "../../assets/icons";

const StaticCar = styled.div`
  position: relative;
  min-height: 25em;
  .position-car {
    display: flex;
    align-items: center;
    height: 100%;
    position: absolute;
  }
  .translucid-mask {
    height: 100%;
    width: 40em;
    position: absolute;
    background: var(--color-backGround-section);
    opacity: 0.7;
    z-index: 1;
  }
`;

const TextDescription = styled.div`
  font-family: "Kometa", "Lato";
  display: flex;
  justify-content: center;
  align-items: center;
  .info {
    h1 {
      color: var(--color-brand-primary);
    }
    p {
      margin: 0px;
    }
  }
`;

const FinishVerification = () => {
  const dataContextLayout = useContext(ContextLayout);
  const {
    dataConfigStep: { config, idStep, step },
    getPipeLine,
    setPipeLine,
    idPawn,
    idItem,
  } = dataContextLayout;
  return (
    <div className="general-container">
      <ComponentGeneralSection title={step}>
        <ComponentBorderTopSection className="grid-column-2-3-1 over-flow-hidden-x">
          <TextDescription>
            <div className="info">
              <h1>Has concluido la primera fase</h1>
              <p>Ya estamos más cerca, continua a la siguiente fase:</p>
              <strong>Documentos de información vehicular</strong>
            </div>
          </TextDescription>
          <StaticCar>
            <div className="position-car">
              <IconCar size="40em" />
            </div>
            <div className="translucid-mask"></div>
          </StaticCar>
        </ComponentBorderTopSection>
        <div
          className="align-button"
          style={{
            marginTop: "4em",
          }}
        >
          <CustomButton
            style={{
              width: "40%",
              padding: "5px 0px",
            }}
            formatType="secondary"
            onClick={async () => {
              try {
                await setPipeLine(
                  {
                    idStep,
                  },
                  idPawn
                );
                await getPipeLine();
              } catch (error) {}
            }}
          >
            Ir a la siguiente fase
          </CustomButton>
        </div>
      </ComponentGeneralSection>
    </div>
  );
};

export default FinishVerification;
