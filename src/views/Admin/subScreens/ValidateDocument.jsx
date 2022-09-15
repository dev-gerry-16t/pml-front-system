import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import CustomIndicationList from "../../../components/customIndicationList";
import ContextStepLine from "../../../context/contextStepLine";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import LoaderApp from "../../../components/loaderApp";
import CustomButton from "../../../components/customButton";

const TextArea = styled.textarea`
  width: 100%;
  border-radius: 10px;
  border: 2px solid var(--color-font-primary);
  padding: 1em;
`;

const ModalView = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  .mask-section {
    width: 100%;
    box-sizing: border-box;
    background: var(--color-backGround-section);
    height: 100%;
    .contain-doc-view {
      width: 100%;
      box-sizing: border-box;
    }
  }
`;

const ButtonHeader = styled.div`
  min-height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .button-modal {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background: rgba(35, 50, 153, 0.3);
  }
`;

const Container = styled.div``;

const ContainerDocument = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin-top: 2em;
  /* border-bottom: 1px solid #090c41; */
  .info-text-action {
    display: grid;
    grid-template-rows: 2fr 1fr auto;
    .data-info {
      padding: 0px 1em;
    }
    .buttons-action {
      display: flex;
      align-items: center;
      column-gap: 1em;
      padding: 0px 1em;
    }
  }
  .documents-preview {
    background: var(--color-backGround-light);
    padding: 1em;
    .border-upload {
      border: 3px solid var(--color-brand-primary);
      padding: 2em;
      border-radius: 1em;
      cursor: pointer;
      .contain-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .title-file-type {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-size: 2.5em;
          color: var(--color-brand-primary);
          text-align: center;
          font-weight: 800;
          text-transform: uppercase;
        }
      }
    }
  }
`;

const ValidateDocument = (props) => {
  const { dataProfile, callGlobalActionApi, idPawn, onGetPipeLine } = props;
  const { idSystemUser, idLoginHistory } = dataProfile;
  const dataContent = useContext(ContextStepLine);
  const [dataSelect, setDataSelect] = useState({});
  const [dataDocuments, setDataDocuments] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectDataFile, setSelectDataFile] = useState({});
  const [isVisibleDocument, setIsVisibleDocument] = useState(false);
  const [comment, setComment] = useState("");
  const [isVisibleComment, setIsVisibleComment] = useState(false);

  const frontFunctions = new FrontFunctions();

  const handlerSelectCurrentDocument = () => {
    const subPipeLine =
      isNil(dataContent.content) === false &&
      isEmpty(dataContent.content) === false &&
      isEmpty(dataContent.content.config) === false &&
      isEmpty(dataContent.content.config.stepLine) === false
        ? dataContent.content.config.stepLine
        : [];
    const findCurrentScreen = subPipeLine.find((rowFind) => {
      return rowFind.isCompleted === false && rowFind.isCurrent === true;
    });
    setDataSelect(findCurrentScreen);
  };

  const handlerGetPawnDocumentsForAdmin = async (idDocumentType) => {
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          idPawn,
          idDocumentType,
        },
        null,
        API_CONSTANTS.ADMIN.GET_PAWN_DOCUMENTS_FOR_ADMIN,
        "POST",
        true
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];
      const documents =
        isEmpty(responseResult) === false &&
        isNil(responseResult.documents) === false &&
        isEmpty(responseResult.documents) === false &&
        isNil(responseResult.documents[0]) === false
          ? responseResult.documents[0]
          : {};
      const document =
        isEmpty(documents) === false && isNil(documents.document) === false
          ? documents.document.filter((row) => {
              return row.canBeEvaluated === true;
            })
          : {};
      setDataDocuments(
        isEmpty(documents) === false && isNil(documents.document) === false
          ? documents.document
          : []
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.WARNING
      );
    }
  };

  const handlerReviewDocument = async (data, id) => {
    try {
      await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          idPawn,
          ...data,
        },
        id,
        API_CONSTANTS.ADMIN.REVIEW_DOCUMENT,
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

  useEffect(() => {
    if (isEmpty(dataContent) === false) {
      handlerSelectCurrentDocument();
    }
  }, [dataContent]);

  useEffect(() => {
    if (isEmpty(dataSelect) === false) {
      handlerGetPawnDocumentsForAdmin(dataSelect.idDocumentType);
    }
  }, [dataSelect]);

  const handlerCloseModalFile = () => {
    setSelectedId(null);
    setIsVisibleDocument(false);
  };

  let component = <LoaderApp />;

  if (isEmpty(dataDocuments) === false) {
    component = (
      <div className="section-shadow padding-2-1">
        {selectedId && (
          <ModalView layoutId={selectedId} onClick={handlerCloseModalFile}>
            <div className="mask-section" onClick={(e) => e.stopPropagation()}>
              <ButtonHeader>
                <button
                  className="button-modal"
                  onClick={handlerCloseModalFile}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path
                      d="M15 5L5 15M5 5l5.03 5.03L15 15"
                      fill="black"
                      strokeWidth="2"
                      stroke=" var(--color-brand-primary)"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </button>
              </ButtonHeader>
              {isVisibleDocument === true && (
                <div className="contain-doc-view">
                  <DocViewer
                    pluginRenderers={DocViewerRenderers}
                    documents={[
                      {
                        uri: selectDataFile.path,
                        fileType: selectDataFile.extension,
                      },
                    ]}
                    config={{
                      header: {
                        disableHeader: true,
                        disableFileName: true,
                        retainURLParams: false,
                      },
                    }}
                    style={{ height: "900px" }}
                  />
                </div>
              )}
            </div>
          </ModalView>
        )}
        <CustomIndicationList
          stepNumber="Paso 1 de 5"
          subTitle=""
          title=""
          isVisibleButton={false}
          onClick={async () => {}}
        >
          <Container>
            <h2>{dataSelect.documentType}</h2>
            {isEmpty(dataDocuments) === false &&
              dataDocuments.map((row) => {
                return (
                  <ContainerDocument>
                    <div className="documents-preview">
                      <div
                        className="border-upload"
                        onClick={() => {
                          setSelectedId(row.idDocument);
                          setSelectDataFile(row);
                          setIsVisibleDocument(true);
                        }}
                      >
                        {isEmpty(row.mimeType) === false &&
                        row.mimeType.indexOf("image") !== -1 ? (
                          <img
                            className="contain-image"
                            src={row.path}
                            alt={row.idDocument}
                          />
                        ) : (
                          <div className="title-file-type">
                            <span>{row.extension}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="info-text-action">
                      <div className="data-info">
                        <div>
                          <strong>Nombre del archivo:</strong> {row.name}
                        </div>
                        {row.isApproved === false && (
                          <div
                            style={{
                              color: "var(--color-brand-primary)",
                            }}
                          >
                            <strong>
                              Este documento fue rechazado por{" "}
                              <u>{row.reviewedByUser}</u>
                            </strong>
                          </div>
                        )}
                        {isEmpty(row.reviewedPath) === false &&
                          isEmpty(row.reviewedPath) === false && (
                            <div>
                              <strong>Comentario de rechazo:</strong>{" "}
                              <a
                                href={row.reviewedPath}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {row.comment}
                              </a>
                            </div>
                          )}
                      </div>
                      {row.canBeEvaluated === true && (
                        <>
                          <div className="buttons-action">
                            <CustomButton
                              style={{
                                padding: "0.2em 0.5em",
                              }}
                              formatType="evaluate"
                              onClick={async () => {
                                try {
                                  await setIsVisibleComment(false);
                                  setTimeout(async () => {
                                    if (
                                      window.confirm(
                                        "Estas por aceptar el documento, ¿Deseas continuar?"
                                      )
                                    ) {
                                      await handlerReviewDocument(
                                        {
                                          isApproved: true,
                                          comment: null,
                                        },
                                        row.idDocument
                                      );
                                      setComment("");
                                      setIsVisibleComment(false);
                                      onGetPipeLine();
                                    }
                                  }, 500);
                                } catch (error) {}
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="8" cy="8" r="7.5" stroke="black" />
                              </svg>{" "}
                              Aceptar
                            </CustomButton>
                            <CustomButton
                              style={{
                                padding: "0.2em 0.5em",
                              }}
                              formatType={
                                isVisibleComment === true
                                  ? "evaluateBlock"
                                  : "evaluate"
                              }
                              onClick={() => {
                                setIsVisibleComment(!isVisibleComment);
                              }}
                            >
                              {isVisibleComment === true ? (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="8"
                                    cy="8"
                                    r="7.5"
                                    stroke="#00D0B0"
                                  />
                                  <circle
                                    cx="8"
                                    cy="8"
                                    r="5.5"
                                    fill="#00D0B0"
                                    stroke="#00D0B0"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="8"
                                    cy="8"
                                    r="7.5"
                                    stroke="black"
                                  />
                                </svg>
                              )}{" "}
                              {isVisibleComment === false
                                ? "Rechazar"
                                : "Cancelar"}
                            </CustomButton>
                          </div>

                          {isVisibleComment === true && (
                            <div
                              style={{
                                marginTop: "1em",
                                display: "flex",
                              }}
                            >
                              <TextArea
                                maxLength={256}
                                value={comment}
                                onChange={(e) => {
                                  setComment(e.target.value);
                                }}
                                placeholder="Escribir al usuario el motivo por el que estas rechazando el documento"
                              ></TextArea>
                              <CustomButton
                                onClick={async () => {
                                  try {
                                    if (isEmpty(comment) === false) {
                                      if (
                                        window.confirm(
                                          "Estas por rechazar el documento, ¿Deseas continuar?"
                                        )
                                      ) {
                                        await handlerReviewDocument(
                                          {
                                            isApproved: false,
                                            comment,
                                          },
                                          row.idDocument
                                        );
                                        setComment("");
                                        setIsVisibleComment(false);
                                        onGetPipeLine();
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
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </ContainerDocument>
                );
              })}
            {/* <div>
              <div></div>
              <div>12345</div>
              <div>Siguiente</div>
            </div> */}
          </Container>
        </CustomIndicationList>
      </div>
    );
  } else {
    component = <LoaderApp />;
  }

  return component;
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ValidateDocument);
