import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import styled from "styled-components";
import ComponentBorderTopSection from "../../components/componentBorderTopSection";
import ComponentChipInfo from "../../components/componentChipInfo";
import {
  callGlobalActionApi,
  callSetCustomerInDocument,
} from "../../utils/actions/actions";
import FrontFunctions from "../../utils/actions/frontFunctions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import ComponentSectionDocument from "../../components/componentSectionDocument";
import CustomButton from "../../components/customButton";

const TextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  border-radius: 10px;
  border: 2px solid var(--color-font-primary);
  padding: 1em;
`;

const BackActions = styled.div`
  background: var(--color-brand-primary);
  color: #fff;
  padding: 1em;
  width: fit-content;
  position: absolute;
  top: 1.5em;
  left: 0px;
  border-radius: 0px 5px 5px 0px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

const Container = styled.div`
  padding: 2em 1em;
  position: relative;
  .section-container {
    padding: 1em;
  }
`;

const SectionCollapse = styled.div`
  margin-top: 3em;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Description = styled.div`
  margin-top: 2em;
  padding: 1em;
  background: #eeeff8;
  border-radius: 1em;
  margin-bottom: 1em;
`;

const ContainerChips = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1em;
  box-sizing: border-box;
  @media screen and (max-width: 740px) {
    flex-direction: column;
  }
`;

const CreditAsigned = styled.div`
  text-align: center;
  color: var(--color-brand-secondary);
  display: flex;
  flex-direction: column;
  padding-bottom: 2em;
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

const ButtonActions = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
`;

const SectionComment = styled.div`
  margin-top: 1em;
  display: flex;
  width: 500px;

  @media screen and (max-width: 740px) {
    row-gap: 0.5em;
    box-sizing: border-box;
    width: 100%;
    flex-direction: column;
    textarea {
      width: 100%;
    }
  }
`;

const DetailUser = (props) => {
  const { dataProfile, callGlobalActionApi, callSetCustomerInDocument } = props;
  const { idSystemUser, idLoginHistory } = dataProfile;
  const [dataPawn, setDataPawn] = useState({});
  const [comment, setComment] = useState("");
  const [isVisibleComment, setIsVisibleComment] = useState(false);

  const frontFunctions = new FrontFunctions();

  const { idPawn } = useParams();
  const navigate = useNavigate();

  const handlerGetPawnById = async () => {
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          idPawn,
        },
        null,
        API_CONSTANTS.ADMIN.GET_PAWN_BY_ID,
        "POST",
        true
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false &&
        isNil(response.response.pawn) === false &&
        isEmpty(response.response.pawn) === false
          ? response.response.pawn
          : {};
      setDataPawn(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.WARNING
      );
    }
  };

  const handlerSetPawnProcess = async (data) => {
    try {
      await callGlobalActionApi(
        {
          metadata: JSON.stringify(data),
          idSystemUser,
          idLoginHistory,
        },
        idPawn,
        API_CONSTANTS.ADMIN.SET_PAWN_PROCESS,
        "PUT",
        true
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.WARNING
      );
      throw error;
    }
  };

  const handlerSetCustomerInDocument = async (file, data) => {
    try {
      await callSetCustomerInDocument(
        file,
        {
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        () => {},
        "PUT"
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.WARNING
      );
      throw error;
    }
  };

  useEffect(() => {
    handlerGetPawnById();
  }, []);

  return (
    <Container>
      <BackActions
        onClick={() => {
          navigate("/websystem/admin");
        }}
      >
        Regresar
      </BackActions>
      <div className="section-shadow section-container">
        <Description>
          <div>
            <strong>Proceso actual:</strong> {dataPawn.process}
          </div>
          <div>
            <strong>Descripción del proceso:</strong>{" "}
            {dataPawn.processDescription}
          </div>
        </Description>
        <ComponentBorderTopSection
          type="secondary"
          className="grid-column-2-responsive"
        >
          <CreditAsigned>
            <h2 className="type-credit">Prestamo aprobado</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: dataPawn.amount,
              }}
            />
          </CreditAsigned>
          <ContainerChips>
            <ComponentChipInfo title="Nombre:" info={dataPawn.customer} />
            <ComponentChipInfo
              title="Correo:"
              info={dataPawn.customerEmailAddress}
            />
            <ComponentChipInfo
              title="Teléfono:"
              info={dataPawn.customerPhoneNumber}
            />
            <ComponentChipInfo
              title="Único dueño:"
              info={dataPawn.isUniqueOwner === true ? "Si" : "No"}
            />
            <ComponentChipInfo
              title="Tipo de empeño:"
              info={dataPawn.pawnType}
            />
            <ComponentChipInfo title="Vehículo:" info={dataPawn.vehicle} />
            {isNil(dataPawn.amountRequested) === false && (
              <ComponentChipInfo
                title="Monto solicitado:"
                info={
                  <div
                    dangerouslySetInnerHTML={{
                      __html: dataPawn.amountRequested,
                    }}
                  />
                }
              />
            )}
          </ContainerChips>
        </ComponentBorderTopSection>
        <SectionCollapse>
          {isEmpty(dataPawn.documentation) === false &&
            dataPawn.documentation.map((row, ix) => {
              return (
                <ComponentSectionDocument
                  key={`section-container-${ix}`}
                  data={row}
                  uploadDocument={async (file, data) => {
                    try {
                      await handlerSetCustomerInDocument(file, data);
                      handlerGetPawnById();
                    } catch (error) {}
                  }}
                />
              );
            })}
        </SectionCollapse>
        {isVisibleComment === false && dataPawn.canValidateFile === true && (
          <ButtonActions>
            <CustomButton
              style={{
                padding: "0.5em 2em",
              }}
              onClick={async () => {
                try {
                  if (
                    window.confirm(
                      "Estas por validar el expediente, ¿Deseas continuar?"
                    )
                  ) {
                    await handlerSetPawnProcess({
                      isApproved: true,
                      comment: null,
                    });
                    handlerGetPawnById();
                  }
                } catch (error) {}
              }}
            >
              Validar expediente
            </CustomButton>
            <CustomButton
              style={{
                padding: "0.5em 2em",
              }}
              formatType="tertiary"
              onClick={() => {
                setIsVisibleComment(true);
              }}
            >
              Rechazar expediente
            </CustomButton>
          </ButtonActions>
        )}
        {isVisibleComment === true && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <SectionComment>
              <TextArea
                maxLength={256}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                placeholder="Escribir el motivo por el que estas rechazando el expediente"
              ></TextArea>
              <CustomButton
                onClick={async () => {
                  try {
                    if (isEmpty(comment) === false) {
                      if (
                        window.confirm(
                          "Estas por rechazar el expediente, ¿Deseas continuar?"
                        )
                      ) {
                        await handlerSetPawnProcess({
                          isApproved: false,
                          comment,
                        });
                        setComment("");
                        setIsVisibleComment(false);
                        handlerGetPawnById();
                      }
                    } else {
                      frontFunctions.showMessageStatusApi(
                        "Aún no escribes el motivo del rechazo",
                        GLOBAL_CONSTANTS.STATUS_API.WARNING
                      );
                    }
                  } catch (error) {}
                }}
                style={{
                  padding: "0.2em 0.5em",
                }}
              >
                Enviar
              </CustomButton>
            </SectionComment>

            <CustomButton
              formatType="tertiary"
              style={{
                padding: "0.5em 1em",
                marginTop: "1em",
              }}
              onClick={() => {
                setComment("");
                setIsVisibleComment(false);
              }}
            >
              Cancelar
            </CustomButton>
          </div>
        )}
        {dataPawn.canScatter === true && (
          <ButtonActions>
            <CustomButton
              style={{
                padding: "0.5em 2em",
              }}
              onClick={async () => {
                try {
                  if (
                    window.confirm(
                      "Estas por marcar la dispersión realizada, ¿Deseas continuar?"
                    )
                  ) {
                    await handlerSetPawnProcess({
                      isApproved: true,
                    });
                    setComment("");
                    setIsVisibleComment(false);
                    handlerGetPawnById();
                  }
                } catch (error) {}
              }}
            >
              Dispersión realizada
            </CustomButton>
          </ButtonActions>
        )}
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method, token) =>
    dispatch(callGlobalActionApi(data, id, constant, method, token)),
  callSetCustomerInDocument: (file, data, callback, method) =>
    dispatch(callSetCustomerInDocument(file, data, callback, method)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailUser);
