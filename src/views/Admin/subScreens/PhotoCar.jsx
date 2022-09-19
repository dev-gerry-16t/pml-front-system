import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import FileViewer from "react-file-viewer";
import ContextStepLine from "../../../context/contextStepLine";
import ContextAdmin from "../../../context/contextAdmin";
import CustomIndicationList from "../../../components/customIndicationList";
import ENVIROMENT from "../../../utils/constants/enviroments";
import CustomButton from "../../../components/customButton";
import { IconUploadFile } from "../../../assets/icons";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import CustomInput from "../../../components/customInput";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import {
  callGlobalActionApi,
  callSetCustomerInDocument,
} from "../../../utils/actions/actions";
import useOnChangeInput from "../../../hooks/useOnChangeInput";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";

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
  overflow: hidden;
  .mask-section {
    width: 60vw;
    min-height: 50vh;
    box-shadow: 0px 0px 0px 100vh rgba(35, 50, 153, 0.6);
    padding: 1em;
    background: var(--color-backGround-light);
    border-radius: 1em;
    border: none;
    .contain-doc-view {
      width: 100%;
      height: 70vh;
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

const SectionInputUpload = styled.div`
  display: flex;
  column-gap: 0.5em;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .border-upload {
    overflow: hidden;
    position: relative;
    padding: 2em;
    border: 3px solid var(--color-brand-primary);
    border-radius: 1em;
    width: 12em;
    height: 8.8em;
    cursor: pointer;
    .delete-doc-process {
      position: absolute;
      bottom: 0px;
      right: 0px;
    }
    .contain-image {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .title-file-type {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      object-fit: cover;
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
    .upload-file {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      height: 100%;
      padding: 1em 0;
      cursor: pointer;
      span {
        font-size: 1.2em;
        color: var(--color-brand-primary);
        text-align: center;
        font-weight: 700;
      }
    }
  }
  @media screen and (max-width: 820px) {
    flex-direction: column;
    row-gap: 1em;
  }
`;

const FormDocument = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1em;
  .contain-image {
    width: 28em;
    height: 25em;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .form-info-document {
    display: flex;
    flex-direction: column;
    width: 28em;
    row-gap: 1em;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  border-radius: 10px;
  border: 2px solid var(--color-font-primary);
  padding: 1em;
  box-sizing: border-box;
  font-size: 1.2em;
  font-family: "Lato";
  background: transparent;
`;

const Description = styled.div`
  margin-top: 0.5em;
  h3 {
    margin: 0px;
  }
  p {
    margin: 0px;
  }
`;

const PhotoCar = (props) => {
  const { callSetCustomerInDocument, dataProfile, callGlobalActionApi } = props;

  const initialState = {
    title: "",
    description: "",
  };

  const dataContent = useContext(ContextStepLine);
  const dataAdmin = useContext(ContextAdmin);
  const [dataForm, onChangeForm, setDataForm] = useOnChangeInput(initialState);

  const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
  const [selectedId, setSelectedId] = useState(null);
  const [selectDataFile, setSelectDataFile] = useState({});
  const [isVisibleDocument, setIsVisibleDocument] = useState(false);
  const [isVisibleViewImage, setIsVisibleViewImage] = useState(false);
  const [dataFile, setDataFile] = useState("");
  const [dataInfoFile, setDataInfoFile] = useState({});
  const [dataDocuments, setDataDocuments] = useState({});

  const frontFunctions = new FrontFunctions();

  const accept = ".png,.jpg,.jpeg";

  const handlerClearFiles = () => {
    setDataFile("");
    setDataInfoFile({});
    setDataForm(initialState);
  };

  const handlerCloseModalFile = () => {
    setSelectedId(null);
    handlerClearFiles();
    setTimeout(() => {
      setIsVisibleDocument(false);
    }, 1000);
  };

  const onClickUploadFile = (file, metadata) => {
    setIsVisibleViewImage(true);
    setDataFile(file);
    setDataInfoFile(metadata);
  };

  const handlerUploadFileV2 = async (e) => {
    try {
      const files = e.target.files[0];
      if (!files) return;

      const extension = frontFunctions.getExtensionFile(files.type);
      const metadata = {
        name: files.name,
        type: files.type,
        extension: extension,
        size: files.size,
      };
      if (!files) return;
      const reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = async (event) => {
        if (extension == "png" || extension == "jpg" || extension == "jpeg") {
          const imgElement = document.createElement("img");
          imgElement.src = event.target.result;
          imgElement.onload = async (event1) => {
            const canvas = document.createElement("canvas");
            const width = event1.target.width;
            const height = event1.target.height;

            const MAX_WIDTH = 1200;
            const scaleSize = MAX_WIDTH / width;

            canvas.width = MAX_WIDTH;
            canvas.height = height * scaleSize;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(event1.target, 0, 0, canvas.width, canvas.height);
            canvas.remove();
            const result = ctx.canvas.toDataURL("image/jpeg", 0.9);
            onClickUploadFile(result, metadata);
          };
          imgElement.remove();
        } else {
          window.alert("El archivo a subir debe ser una imagen");
        }
      };
      document.getElementById("id-file-upload-checklist").value = "";
    } catch (error) {
      document.getElementById("id-file-upload-checklist").value = "";
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

  const handlerGetPawnDocumentsForAdmin = async () => {
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          idPawn: dataContent.content.metadata.idPawn,
          idDocumentType: dataContent.content.metadata.idDocumentType,
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
        isNil(responseResult.documents[0]) === false &&
        isEmpty(responseResult.documents[0]) === false &&
        isNil(responseResult.documents[0].document) === false &&
        isEmpty(responseResult.documents[0]) === false
          ? responseResult.documents[0].document
          : [];
      setDataDocuments(documents);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.WARNING
      );
    }
  };

  const handlerGenerateBlobImage = async (src, data) => {
    try {
      const urlObject = await fetch(src);
      const blobFile = await urlObject.blob();
      await handlerSetCustomerInDocument(blobFile, data);
      await handlerGetPawnDocumentsForAdmin();
      handlerClearFiles();
    } catch (error) {
      throw error;
    }
  };

  const handlerDeleteCustomerInDocuments = async (data) => {
    try {
      await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          idCustomer: null,
          ...data,
        },
        null,
        API_CONSTANTS.SYSTEM_USER.SET_CUSTOMER_IN_DELETE_DOCUMENT,
        "POST",
        true
      );
      handlerGetPawnDocumentsForAdmin();
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  useEffect(() => {
    if (
      isEmpty(dataContent) === false &&
      isEmpty(dataContent.content) === false
    ) {
      handlerGetPawnDocumentsForAdmin();
    }
  }, [dataContent]);

  return (
    <div className="section-shadow padding-2-1">
      {selectedId && (
        <ModalView layoutId={selectedId} onClick={handlerCloseModalFile}>
          <div className="mask-section" onClick={(e) => e.stopPropagation()}>
            <ButtonHeader>
              <button className="button-modal" onClick={handlerCloseModalFile}>
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
                <FileViewer
                  fileType={selectDataFile.extension}
                  filePath={selectDataFile.path}
                  onError={() => {}}
                />
              </div>
            )}
          </div>
        </ModalView>
      )}

      {isVisibleViewImage && (
        <ModalView
          onClick={() => {
            setIsVisibleViewImage(false);
          }}
        >
          <div className="mask-section" onClick={(e) => e.stopPropagation()}>
            <ButtonHeader>
              <button
                className="button-modal"
                onClick={() => {
                  setIsVisibleViewImage(false);
                }}
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
            <div className="contain-doc-view">
              <FormDocument>
                <div className="contain-image">
                  <img src={dataFile} alt="" />
                </div>
                <div className="form-info-document">
                  <CustomInput
                    value={dataForm.title}
                    placeholder="Ingresa el titulo de la imagen"
                    name="title"
                    onChange={onChangeForm}
                  />
                  <TextArea
                    value={dataForm.description}
                    name="description"
                    placeholder="Ingresa la descripción de la imagen"
                    onChange={onChangeForm}
                  />
                  <div>
                    <CustomButton
                      style={{
                        width: "100%",
                        padding: "0.5em 0px",
                      }}
                      onClick={async () => {
                        try {
                          const metaData = {
                            ...dataContent.content.metadata,
                            ...dataForm,
                          };
                          const data = {
                            idCustomer,
                            idDocument: null,
                            name: dataInfoFile.name,
                            extension: dataInfoFile.extension,
                            metadata: JSON.stringify(metaData),
                            mimeType: dataInfoFile.type,
                            isActive: true,
                            bucketSource:
                              dataContent.content.config.bucketSource,
                          };
                          await handlerGenerateBlobImage(dataFile, data);
                          setIsVisibleViewImage(false);
                        } catch (error) {}
                      }}
                    >
                      Continuar
                    </CustomButton>
                  </div>
                </div>
              </FormDocument>
            </div>
          </div>
        </ModalView>
      )}
      <CustomIndicationList>
        <h2>{dataContent.content.step}</h2>
        <SectionInputUpload>
          {isEmpty(dataDocuments) === false &&
            dataDocuments.map((row, ix) => {
              if (isEmpty(row) === false) {
                return (
                  <div>
                    <div
                      // layoutId={row.idDocument}
                      key={`image-upload-${ix}`}
                      className="border-upload"
                      onClick={() => {
                        setSelectedId(row.idDocument);
                        setSelectDataFile(row);
                        setTimeout(() => {
                          setIsVisibleDocument(true);
                        }, 1000);
                      }}
                    >
                      {isEmpty(row.mimeType) === false &&
                      row.mimeType.indexOf("image") !== -1 ? (
                        <img
                          className="contain-image"
                          src={`${row.path}?type=${row.mimeType}`}
                          alt={row.idDocument}
                        />
                      ) : (
                        <div className="title-file-type">
                          <span>{row.extension}</span>
                        </div>
                      )}
                      <div className="delete-doc-process">
                        <CustomButton
                          style={{
                            padding: "1em",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              window.confirm(
                                "¿Seguro que deseas eliminar tu documento?"
                              ) === true
                            ) {
                              handlerDeleteCustomerInDocuments({
                                idDocument: row.idDocument,
                                isActive: false,
                              });
                            } else {
                            }
                          }}
                          formatType="underline-secondary"
                        >
                          Eliminar
                        </CustomButton>
                      </div>
                    </div>
                    <Description>
                      <h3>{row.title}</h3>
                      <p>{row.description}</p>
                    </Description>
                  </div>
                );
              } else {
                return <></>;
              }
            })}

          <div className="border-upload">
            <label className="upload-file" htmlFor={`id-file-upload-checklist`}>
              <IconUploadFile size="5em" />
              <span>Tomar foto</span>
            </label>
            <input
              id={`id-file-upload-checklist`}
              accept={accept}
              style={{ display: "none" }}
              type="file"
              capture="camera"
              onChange={handlerUploadFileV2}
            />
          </div>
        </SectionInputUpload>
      </CustomIndicationList>
      <div
        className="align-button"
        style={{
          padding: "3em 0px",
        }}
      >
        <CustomButton
          style={{
            padding: "0.5em 2em",
          }}
          onClick={async () => {
            try {
              if (
                window.confirm("¿Estas seguro de avanzar al siguiente paso?")
              ) {
                await dataAdmin.setPipeLineAdminStep({
                  idStep: dataContent.content.idStep,
                  idStepLine: null,
                  metadata: null,
                });
              }
            } catch (error) {}
          }}
        >
          Siguiente paso
        </CustomButton>
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PhotoCar);
