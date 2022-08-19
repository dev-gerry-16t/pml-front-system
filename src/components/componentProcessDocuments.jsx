import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import FileViewer from "react-file-viewer";
import { IconUploadFile } from "../assets/icons";
import CustomButton from "./customButton";
import CustomIndicationList from "./customIndicationList";
import FrontFunctions from "../utils/actions/frontFunctions";
import ENVIROMENT from "../utils/constants/enviroments";

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
const ButtonCapture = styled.label`
  background: var(--color-brand-secondary);
  border-radius: 0.6em;
  font-family: "Lato";
  font-size: 1.2em;
  font-weight: 500;
  padding: 0.5em 2em;
  color: var(--color-font-secondary);
  display: flex;
  justify-content: center;
  align-items: center;
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
    title = "",
  } = props;

  const [selectedId, setSelectedId] = useState(null);
  const [selectDataFile, setSelectDataFile] = useState({});
  const [isVisibleDocument, setIsVisibleDocument] = useState(false);

  const frontFunctions = new FrontFunctions();

  const handlerUploadFile = async (e) => {
    try {
      const files = e.target.files[0];
      if (!files) return;

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
        document.getElementById("id-file-upload-checklist").value = "";
      } else {
        alert("El tamaño del archivo supera el máximo permitido");
        document.getElementById("id-file-upload-checklist").value = "";
      }
    } catch (error) {
      document.getElementById("id-file-upload-checklist").value = "";
    }
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
          onClickUploadFile(event.target.result, metadata);
        }
      };
      document.getElementById("id-file-camera-checklist").value = "";
    } catch (error) {
      document.getElementById("id-file-camera-checklist").value = "";
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
                  filePath={`${ENVIROMENT}/api/v1/file/getFile/${bucketDocument}/${selectDataFile.idDocument}?type=${selectDataFile.mimeType}`}
                  onError={() => {}}
                />
              </div>
            )}
          </div>
        </ModalView>
      )}
      <CustomIndicationList
        stepNumber={stepNumber}
        subTitle={subTitle}
        title={title}
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
                          src={`${ENVIROMENT}/api/v1/file/getFile/${bucketDocument}/${row.idDocument}?type=${row.mimeType}`}
                          alt={row.idDocument}
                        />
                      ) : (
                        <div className="title-file-type">
                          <span>{row.extension}</span>
                        </div>
                      )}
                    </div>
                  );
                } else {
                  return <></>;
                }
              })}

            <div className="border-upload">
              <label
                className="upload-file"
                htmlFor={`id-file-upload-checklist`}
              >
                <IconUploadFile size="5em" />
                <span>Subir documento</span>
              </label>
              <input
                id={`id-file-upload-checklist`}
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
            <ButtonCapture htmlFor={`id-file-camera-checklist`}>
              <span>Tomar foto</span>
            </ButtonCapture>
            <input
              id={`id-file-camera-checklist`}
              type="file"
              capture="camera"
              style={{ display: "none" }}
              onChange={handlerUploadFileV2}
            />
            {/* <CustomButton
              style={{
                padding: "0.5em 2em",
              }}
              onClick={onClickOpenCamera}
            >
              Tomar foto
            </CustomButton> */}
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
