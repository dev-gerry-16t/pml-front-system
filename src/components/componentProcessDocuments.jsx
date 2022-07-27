import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { IconUploadFile } from "../assets/icons";
import CustomButton from "./customButton";
import CustomIndicationList from "./customIndicationList";
import FrontFunctions from "../utils/actions/frontFunctions";
import ENVIROMENT from "../utils/constants/enviroments";

const ModalView = styled(motion.div)`
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
  .border-upload {
    overflow: hidden;
    position: relative;
    padding: 2em;
    border: 3px solid var(--color-brand-primary);
    border-radius: 1em;
    width: 12em;
    height: 8.8em;
    cursor: pointer;
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
`;

const ComponentProcessDocument = (props) => {
  const {
    children = <></>,
    onClickOpenCamera = () => {},
    onClickUploadFile = () => {},
    onClickNextStep = () => {},
    stepNumber,
    subTitle,
    canTakePhoto = true,
    canUploadFile = false,
    canGoNextStep = false,
    documents = [],
    bucketDocument = "",
    accept = "*",
  } = props;

  const [selectedId, setSelectedId] = useState(null);
  const [selectDataFile, setSelectDataFile] = useState({});
  const [isVisibleDocument, setIsVisibleDocument] = useState(false);

  const frontFunctions = new FrontFunctions();

  const handlerUploadFile = (e) => {
    const files = e.target.files[0];
    if (files.size <= 10000000) {
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
        const result = event.target.result;
        onClickUploadFile(result, metadata);
      };
    } else {
      alert("El tamaño del archivo supera el máximo permitido");
    }
  };

  const handlerCloseModalFile = () => {
    setSelectedId(null);
    setTimeout(() => {
      setIsVisibleDocument(false);
    }, 1000);
  };
  return (
    <div className="section-shadow padding-2-1">
      <AnimatePresence>
        {selectedId && (
          <ModalView layoutId={selectedId} onClick={handlerCloseModalFile}>
            <div className="mask-section" onClick={(e) => e.stopPropagation()}>
              <ButtonHeader>
                <motion.button
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.8 }}
                  className="button-modal"
                  onClick={handlerCloseModalFile}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path
                      d="M15 5L5 15M5 5l5.03 5.03L15 15"
                      fill="black"
                      stroke-width="2"
                      stroke=" var(--color-brand-primary)"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </motion.button>
              </ButtonHeader>
              {isVisibleDocument === true && (
                <DocViewer
                  className="contain-doc-view"
                  pluginRenderers={DocViewerRenderers}
                  config={{
                    header: {
                      disableFileName: true,
                      disableHeader: true,
                    },
                  }}
                  documents={[
                    {
                      uri: `${ENVIROMENT}/api/v1/file/getFile/${bucketDocument}/${selectDataFile.idDocument}?type=${selectDataFile.mimeType}`,
                    },
                  ]}
                />
              )}
            </div>
          </ModalView>
        )}
      </AnimatePresence>
      <CustomIndicationList
        stepNumber={stepNumber}
        subTitle={subTitle}
        isVisibleButton={false}
        onClick={async () => {}}
      >
        {children}
        {canUploadFile === true && (
          <SectionInputUpload>
            {isEmpty(documents) === false &&
              documents.map((row, ix) => {
                if (isEmpty(row) === false) {
                  return (
                    <motion.div
                      layoutId={row.idDocument}
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
                          src={`${ENVIROMENT}/api/v1/file/getFile/${bucketDocument}/${row.idDocument}?type=${row.mimeType}`}
                          alt={row.idDocument}
                        />
                      ) : (
                        <div className="title-file-type">
                          <span>{row.extension}</span>
                        </div>
                      )}
                    </motion.div>
                  );
                } else {
                  return <></>;
                }
              })}

            <div className="border-upload">
              <label className="upload-file" for={`id-file`}>
                <IconUploadFile size="5em" />
                <span>Subir documento</span>
              </label>
              <input
                id={`id-file`}
                accept={accept}
                style={{ display: "none" }}
                type="file"
                multiple
                onChange={handlerUploadFile}
              />
            </div>
          </SectionInputUpload>
        )}
        {canTakePhoto === true && window.mobileCheck() === true && (
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
              onClick={onClickOpenCamera}
            >
              Tomar foto
            </CustomButton>
          </div>
        )}
      </CustomIndicationList>
      {canGoNextStep === true && (
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
            onClick={onClickNextStep}
          >
            Siguiente
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default ComponentProcessDocument;
