import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import ComponentBorderTopSection from "../../../components/componentBorderTopSection";
import CustomButton from "../../../components/customButton";
import ContextStepLine from "../../../context/contextStepLine";
import ContextAdmin from "../../../context/contextAdmin";
import LoaderApp from "../../../components/loaderApp";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import CustomInput from "../../../components/customInput";

const CreditAsigned = styled.div`
  text-align: center;
  color: var(--color-brand-secondary);
  display: flex;
  flex-direction: column;
  padding-bottom: 2em;
  border-bottom: 0.5px solid #090c41;
  .type-credit {
    color: var(--color-font-dark);
    font-weight: 900;
    font-family: "Kometa", "Lato";
    padding-top: 10px;
  }
  .button-action {
    margin-top: 2em;
  }
  .format-amount {
    display: flex;
    justify-content: center;
    align-items: baseline;
    column-gap: 0.5em;
    margin-top: 2em;
    h1 {
      font-family: "Kometa", "Lato";
      font-style: normal;
      font-weight: 900;
      font-size: 2em;
      margin: 0px;
    }
    span {
      margin: 0px;
      font-weight: 900;
    }
  }
`;

const ButtonsActions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em;
`;

const ViewAmount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .button-actions-amount {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    row-gap: 1em;
  }
`;

const Offer = () => {
  const dataContent = useContext(ContextStepLine);
  const dataAdmin = useContext(ContextAdmin);
  const [isVisibleAmount, setIsVisibleAmount] = useState(false);
  const [valueAmount, setValueAmount] = useState(0);
  const [valueAmountFormat, setValueAmountFormat] = useState("");

  let component = <LoaderApp />;
  if (
    isEmpty(dataContent) === false &&
    isNil(dataContent.content) === false &&
    isEmpty(dataContent.content) === false
  ) {
    component = (
      <div className="section-shadow padding-2-1">
        <ComponentBorderTopSection type="secondary">
          <CreditAsigned>
            <h2 className="type-credit">{dataContent.content.step}</h2>
            {isVisibleAmount === false ? (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataAdmin.amount,
                  }}
                />
                <div className="button-action">
                  <CustomButton
                    style={{
                      padding: "0.5em 2em",
                    }}
                    onClick={() => {
                      setIsVisibleAmount(true);
                    }}
                    formatType="primary"
                  >
                    Asignar una nueva pre-oferta
                  </CustomButton>
                </div>
              </>
            ) : (
              <ViewAmount>
                <CustomInput
                  type="currency"
                  value={valueAmountFormat}
                  placeholder="Ingresa el monto en MXN"
                  onChange={(e, format) => {
                    const value = e.target.value;
                    setValueAmountFormat(format);
                    setValueAmount(value);
                  }}
                />
                <div className="button-actions-amount">
                  <CustomButton
                    onClick={() => {
                      setIsVisibleAmount(false);

                    }}
                    style={{
                      padding: "0.5em 2em",
                    }}
                  >
                    Aceptar y enviar
                  </CustomButton>
                  <CustomButton
                    onClick={() => {
                      setIsVisibleAmount(false);
                    }}
                    style={{
                      padding: "0.5em 2em",
                    }}
                    formatType="underline-secondary"
                  >
                    Cancelar
                  </CustomButton>
                </div>
              </ViewAmount>
            )}
          </CreditAsigned>
          <ButtonsActions>
            <CustomButton
              style={{
                padding: "0.5em 2em",
              }}
              formatType="tertiary"
            >
              Rechazó la oferta
            </CustomButton>
            <CustomButton
              style={{
                padding: "0.5em 2em",
              }}
            >
              Acepto la oferta
            </CustomButton>
          </ButtonsActions>
        </ComponentBorderTopSection>
      </div>
    );
  }

  return component;
};

export default Offer;
