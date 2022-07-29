import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import React from "react";
import styled from "styled-components";
import { IconUploadFile } from "../assets/icons";
import CustomButton from "./customButton";
import CustomIndicationList from "./customIndicationList";
import FrontFunctions from "../utils/actions/frontFunctions";
import ENVIROMENT from "../utils/constants/enviroments";

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
    .contain-image {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      object-fit: cover;
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

  return (
    <div className="section-shadow padding-2-1">
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
                    <div key={`image-upload-${ix}`} className="border-upload">
                      <img
                        className="contain-image"
                        src={`${ENVIROMENT}/api/v1/file/getFile/${bucketDocument}/${row.idDocument}?type=${row.mimeType}`}
                        alt={row.idDocument}
                      />
                    </div>
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
        {canTakePhoto === true && (
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
