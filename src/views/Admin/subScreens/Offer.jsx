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
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: center;
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

const SectionRequestAmount = styled.div`
  display: flex;
  justify-content: center;
  .container-request {
  }
`;

const Offer = () => {
  const dataContent = useContext(ContextStepLine);
  const dataAdmin = useContext(ContextAdmin);
  const [isVisibleAmount, setIsVisibleAmount] = useState(false);
  const [valueAmount, setValueAmount] = useState(0);
  const [valueAmountFormat, setValueAmountFormat] = useState("");
  const [valueRequestAmount, setValueRequestAmount] = useState(0);
  const [valueRequestAmountFormat, setValueRequestAmountFormat] = useState("");

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
                    Asignar un nuevo monto
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
                    onClick={async () => {
                      try {
                        if (isNil(valueAmount) || valueAmount === 0) {
                          window.alert(
                            "Antes de guardar ingresa el monto nuevo"
                          );
                        } else {
                          const pathService =
                            dataContent.content.path === "pre-offer";
                          await dataAdmin.setPipeLineAdminStep({
                            idStep: dataContent.content.idStep,
                            idStepLine: null,
                            metadata:
                              pathService === true
                                ? JSON.stringify({
                                    preOffer: valueAmount,
                                    isPreOfferAccepted: null,
                                  })
                                : JSON.stringify({
                                    amount: valueAmount,
                                    isAccepted: null,
                                  }),
                          });
                          setIsVisibleAmount(false);
                          setValueAmount(0);
                          setValueAmountFormat("");
                        }
                      } catch (error) {
                        setValueAmount(0);
                        setValueAmountFormat("");
                        setIsVisibleAmount(false);
                      }
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
                      setValueAmount(0);
                      setValueAmountFormat("");
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
            {isEmpty(dataContent.content.config) === false &&
              isNil(dataContent.content.config.isFinalOffer) === false &&
              dataContent.content.config.isFinalOffer === true && (
                <SectionRequestAmount>
                  <div className="container-request">
                    <p>
                      Solo si el usuario desea un monto diferente ingresalo en
                      el siguiente campo
                    </p>
                    <CustomInput
                      type="currency"
                      value={valueRequestAmountFormat}
                      placeholder="Ingresa el monto solicitado en MXN"
                      onChange={(e, format) => {
                        const value = e.target.value;
                        setValueRequestAmountFormat(format);
                        setValueRequestAmount(value);
                      }}
                    />
                  </div>
                </SectionRequestAmount>
              )}
          </CreditAsigned>
          <ButtonsActions>
            <CustomButton
              style={{
                padding: "0.5em 2em",
              }}
              formatType="tertiary"
              onClick={async () => {
                try {
                  if (
                    window.confirm(
                      "¿Estas seguro que el usuario rechazó la oferta?"
                    )
                  ) {
                    const pathService =
                      dataContent.content.path === "pre-offer";
                    await dataAdmin.setPipeLineAdminStep({
                      idStep: dataContent.content.idStep,
                      idStepLine: null,
                      metadata:
                        pathService === true
                          ? JSON.stringify({
                              preOffer: null,
                              isPreOfferAccepted: false,
                            })
                          : JSON.stringify({
                              amount: null,
                              isAccepted: false,
                              amountRequested: null,
                            }),
                    });
                  }
                } catch (error) {}
              }}
            >
              Rechazó
            </CustomButton>
            <CustomButton
              style={{
                padding: "0.5em 2em",
              }}
              onClick={async () => {
                try {
                  if (
                    window.confirm(
                      "¿Estas seguro que el usuario aceptó la oferta?"
                    )
                  ) {
                    const pathService =
                      dataContent.content.path === "pre-offer";
                    await dataAdmin.setPipeLineAdminStep({
                      idStep: dataContent.content.idStep,
                      idStepLine: null,
                      metadata:
                        pathService === true
                          ? JSON.stringify({
                              preOffer: null,
                              isPreOfferAccepted: true,
                            })
                          : JSON.stringify({
                              amount: null,
                              isAccepted: true,
                              amountRequested:
                                valueRequestAmount === 0 ||
                                valueRequestAmount === ""
                                  ? null
                                  : valueRequestAmount,
                            }),
                    });
                  }
                } catch (error) {}
              }}
            >
              Aceptó
            </CustomButton>
          </ButtonsActions>
        </ComponentBorderTopSection>
      </div>
    );
  }

  return component;
};

export default Offer;
